// main.cpp

#include <opencv2/opencv.hpp>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>
#include <random>
#include <unordered_map>
#include "convcodec.hpp" // 包含您的编码器

// 将字符串转换为字节向量
std::vector<unsigned char> stringToBytes(const std::string& str) {
    return std::vector<unsigned char>(str.begin(), str.end());
}

// 将字节向量转换为字符串
std::string bytesToString(const std::vector<unsigned char>& bytes) {
    return std::string(bytes.begin(), bytes.end());
}

// 将字节向量转换为二进制位
std::vector<bool> bytesToBits(const std::vector<unsigned char>& bytes) {
    std::vector<bool> bits;
    for (unsigned char byte : bytes) {
        for (int i = 7; i >= 0; --i) {
            bits.push_back((byte >> i) & 1);
        }
    }
    return bits;
}

// 将 11 位无符号整数转换为二进制位（大端序）
std::vector<bool> uint11ToBits(uint16_t value) {
    std::vector<bool> bits(11, 0);
    for (int i = 10; i >= 0; --i) {
        bits[10 - i] = (value >> i) & 1;
    }
    return bits;
}

// 将 11 位二进制位转换为无符号整数（大端序）
uint16_t bitsToUint11(const std::vector<bool>& bits, size_t start) {
    uint16_t value = 0;
    for (int i = 0; i < 11; ++i) {
        value = (value << 1) | (bits[start + i] ? 1 : 0);
    }
    return value;
}

// 将二进制位转换为字节向量
std::vector<unsigned char> bitsToBytes(const std::vector<bool>& bits) {
    std::vector<unsigned char> bytes;
    size_t numBytes = bits.size() / 8;
    for (size_t i = 0; i < numBytes; ++i) {
        unsigned char byte = 0;
        for (int j = 0; j < 8; ++j) {
            byte = (byte << 1) | (bits[i * 8 + j] ? 1 : 0);
        }
        bytes.push_back(byte);
    }
    // 处理剩余的位（如果有的话）
    if (bits.size() % 8 != 0) {
        unsigned char byte = 0;
        for (size_t j = numBytes * 8; j < bits.size(); ++j) {
            byte = (byte << 1) | (bits[j] ? 1 : 0);
        }
        byte <<= (8 - (bits.size() % 8));
        bytes.push_back(byte);
    }
    return bytes;
}

// 根据密码生成确定的随机排列
std::vector<size_t> generate_order(size_t N, const std::string& password) {
    std::vector<size_t> order(N);
    for (size_t i = 0; i < N; ++i) {
        order[i] = i;
    }
    // 使用密码生成随机数种子
    std::seed_seq seed(password.begin(), password.end());
    std::mt19937 rng(seed);
    std::shuffle(order.begin(), order.end(), rng);
    return order;
}

// 隐写函数：将信息嵌入图像
bool stego_msg(const std::string& inputImagePath, const std::string& outputImagePath, const std::string& message, float step_size, const std::string& password) {
    // 初始化编码器
    ConvolutionalCodec codec;

    // 读取图像
    cv::Mat image = cv::imread(inputImagePath, cv::IMREAD_COLOR);
    if (image.empty()) {
        std::cerr << "无法读取图像: " << inputImagePath << std::endl;
        return false;
    }

    // 将图像转换为YCrCb颜色空间
    cv::Mat ycrcb;
    cv::cvtColor(image, ycrcb, cv::COLOR_BGR2YCrCb);

    // 分离Y, Cr, Cb通道
    std::vector<cv::Mat> channels(3);
    cv::split(ycrcb, channels);

    // 将消息转换为字节和位
    std::vector<unsigned char> message_bytes = stringToBytes(message);
    size_t message_length = message_bytes.size();

    // 检查消息长度
    if (message_length > 2048) {
        std::cerr << "消息过长，最大支持 2048 字节。" << std::endl;
        return false;
    }

    // 将消息转换为位
    std::vector<bool> message_bits = bytesToBits(message_bytes);

    // 添加消息长度信息（11位），重复三次
    std::vector<bool> length_bits = uint11ToBits(static_cast<uint16_t>(message_length));
    std::vector<bool> length_bits_repeated;
    for(int i = 0; i < 3; ++i){
        length_bits_repeated.insert(length_bits_repeated.end(), length_bits.begin(), length_bits.end());
    }
    std::vector<bool> length_encoded = codec.encode(length_bits_repeated);

    // 使用编码器对消息位进行编码
    std::vector<bool> encoded_bits = codec.encode(message_bits);

    std::vector<bool> full_bits;
    full_bits.insert(full_bits.end(), length_encoded.begin(), length_encoded.end());
    full_bits.insert(full_bits.end(), encoded_bits.begin(), encoded_bits.end());

    // 计算嵌入容量
    size_t block_size = 8;
    size_t bitsPerBlockPerChannel = 1; // 每个通道每块嵌入1位
    size_t capacityPerChannel = (channels[0].rows / block_size) * (channels[0].cols / block_size) * bitsPerBlockPerChannel;
    size_t totalCapacity = capacityPerChannel * 3; // Y, Cr, Cb 三个通道

    if (full_bits.size() > totalCapacity) {
        std::cerr << "消息太长，无法嵌入到图像中。" << std::endl;
        return false;
    }

    // 基于密码生成嵌入顺序
    std::vector<size_t> order = generate_order(totalCapacity, password);

    // 创建长度为 totalCapacity 的全-1数组 P
    std::vector<char> P(totalCapacity, -1);

    // 将编码后的位序列写入 P[order[i]]
    for (size_t i = 0; i < full_bits.size(); ++i) {
        P[order[i]] = full_bits[i] ? 1 : 0;
    }

    // 将 P 分成三个通道的位序列
    size_t bitsPerChannel = capacityPerChannel;
    std::vector<char> bitsY(P.begin(), P.begin() + bitsPerChannel);
    std::vector<char> bitsCr(P.begin() + bitsPerChannel, P.begin() + 2 * bitsPerChannel);
    std::vector<char> bitsCb(P.begin() + 2 * bitsPerChannel, P.end());

    // 嵌入到通道的函数（已修改）
    auto embed_bits_to_channel = [&](cv::Mat& channel, const std::vector<char>& bits, float step_size_channel) {
        size_t bitIndex = 0;
        for (int row = 0; row + block_size <= channel.rows; row += block_size) {
            for (int col = 0; col + block_size <= channel.cols; col += block_size) {
                if (bitIndex >= bits.size()) break;

                // 取8x8块
                cv::Rect roi(col, row, block_size, block_size);
                cv::Mat block = channel(roi);

                // 进行DCT变换
                cv::Mat blockFloat;
                block.convertTo(blockFloat, CV_32F);
                cv::dct(blockFloat, blockFloat);

                // 嵌入1位信息到一对中频系数
                int i1 = 1, j1 = 2;
                int i2 = 2, j2 = 1;

                char bit = bits[bitIndex];
                if(bit == -1){
                    // 不需要编码，跳过
                    bitIndex++;
                    continue;
                }

                float coef1 = blockFloat.at<float>(i1, j1);
                float coef2 = blockFloat.at<float>(i2, j2);

                // 根据比特调整系数的相对大小
                if (bit == 1) {
                    if (std::abs(coef1) <= std::abs(coef2)) {
                        // 增加差值以确保 coef1 > coef2
                        float adjustment = (std::abs(coef2) - std::abs(coef1)) + step_size_channel;
                        if (coef1 >= 0) {
                            coef1 += adjustment;
                        } else {
                            coef1 -= adjustment;
                        }
                    }
                } else {
                    if (std::abs(coef1) >= std::abs(coef2)) {
                        // 增加差值以确保 coef1 < coef2
                        float adjustment = (std::abs(coef1) - std::abs(coef2)) + step_size_channel;
                        if (coef2 >= 0) {
                            coef2 += adjustment;
                        } else {
                            coef2 -= adjustment;
                        }
                    }
                }

                blockFloat.at<float>(i1, j1) = coef1;
                blockFloat.at<float>(i2, j2) = coef2;

                // 进行反DCT变换
                cv::Mat idctBlock;
                cv::idct(blockFloat, idctBlock);

                // 将IDCT结果转换回8位
                idctBlock.convertTo(block, CV_8U);
                block.copyTo(channel(roi));

                bitIndex++;
            }
            if (bitIndex >= bits.size()) break;
        }
    };

    // 在各通道中嵌入，使用用户指定的步长
    embed_bits_to_channel(channels[0], bitsY, step_size);

    float step_size_cr = step_size * 1.5f; // 可根据需要调整
    embed_bits_to_channel(channels[1], bitsCr, step_size_cr);

    float step_size_cb = step_size * 1.5f; // 可根据需要调整
    embed_bits_to_channel(channels[2], bitsCb, step_size_cb);

    // 合并通道并转换回BGR
    cv::merge(channels, ycrcb);
    cv::Mat stegoImage;
    cv::cvtColor(ycrcb, stegoImage, cv::COLOR_YCrCb2BGR);

    std::vector<int> compression_params;
    compression_params.push_back(cv::IMWRITE_JPEG_QUALITY);
    compression_params.push_back(60); // 调整JPEG质量因子

    // 保存图像，使用JPEG格式以测试抗压缩性
    if (!cv::imwrite(outputImagePath, stegoImage, compression_params)) {
        std::cerr << "无法保存隐写后的图像: " << outputImagePath << std::endl;
        return false;
    }

    return true;
}
// 解码函数：从隐写图像中提取信息
std::string decode_msg(const std::string& stegoImagePath, float step_size, const std::string& password) {
    // 初始化解码器
    ConvolutionalCodec codec;

    // 读取图像
    cv::Mat stegoImage = cv::imread(stegoImagePath, cv::IMREAD_COLOR);
    if (stegoImage.empty()) {
        std::cerr << "无法读取图像: " << stegoImagePath << std::endl;
        return "";
    }

    // 将图像转换为YCrCb颜色空间
    cv::Mat ycrcb;
    cv::cvtColor(stegoImage, ycrcb, cv::COLOR_BGR2YCrCb);

    // 分离Y, Cr, Cb通道
    std::vector<cv::Mat> channels(3);
    cv::split(ycrcb, channels);

    // 计算嵌入容量
    size_t block_size = 8;
    size_t bitsPerBlockPerChannel = 1; // 每个通道每块嵌入1位
    size_t capacityPerChannel = (channels[0].rows / block_size) * (channels[0].cols / block_size) * bitsPerBlockPerChannel;
    size_t totalCapacity = capacityPerChannel * 3; // Y, Cr, Cb 三个通道

    // 基于密码生成嵌入顺序
    std::vector<size_t> order = generate_order(totalCapacity, password);

    // 提取所有嵌入位的方法（已修改）
    auto extract_bits = [&](const cv::Mat& channel, float step_size_channel) -> std::vector<bool> {
        std::vector<bool> bits;
        for (int row = 0; row + block_size <= channel.rows; row += block_size) {
            for (int col = 0; col + block_size <= channel.cols; col += block_size) {
                // 取8x8块
                cv::Rect roi(col, row, block_size, block_size);
                cv::Mat block = channel(roi);

                // 进行DCT变换
                cv::Mat blockFloat;
                block.convertTo(blockFloat, CV_32F);
                cv::dct(blockFloat, blockFloat);

                // 提取1位信息从一对中频系数
                int i1 = 1, j1 = 2;
                int i2 = 2, j2 = 1;

                float coef1 = blockFloat.at<float>(i1, j1);
                float coef2 = blockFloat.at<float>(i2, j2);

                char bit = (std::abs(coef1) > std::abs(coef2)) ? 1 : 0;
                bits.push_back(bit);
            }
        }
        return bits;
    };

    // 从各通道提取位
    std::vector<bool> bitsY = extract_bits(channels[0], step_size);

    float step_size_cr = step_size * 1.5f;
    std::vector<bool> bitsCr = extract_bits(channels[1], step_size_cr);

    float step_size_cb = step_size * 1.5f;
    std::vector<bool> bitsCb = extract_bits(channels[2], step_size_cb);

    // 将 bitsY, bitsCr, bitsCb 合并为 P
    std::vector<bool> P(totalCapacity);
    size_t idx = 0;
    for(size_t i = 0; i < bitsY.size(); ++i){
        P[idx++] = bitsY[i];
    }
    for(size_t i = 0; i < bitsCr.size(); ++i){
        P[idx++] = bitsCr[i];
    }
    for(size_t i = 0; i < bitsCb.size(); ++i){
        P[idx++] = bitsCb[i];
    }

    // 根据 ORDER 重组位序列
    // 先提取长度信息
    std::vector<bool> length_bits_retrieved;
    for(int i = 0; i < 9 * 3 * 11 + 27; ++i){
        if(order.size() > i && order[i] < P.size()){
            length_bits_retrieved.push_back(P[order[i]]);
        }
    }

    // 检查是否有足够的位提取长度
    if(length_bits_retrieved.size() < 9 * 3 * 11 + 27){
        std::cerr << "解码后的比特流长度不足，无法提取消息长度。" << std::endl;
        return "";
    }
    std::vector<bool> length_bits = codec.decode(length_bits_retrieved);

    // 提取三次长度信息
    std::vector<uint16_t> lengths;
    for(int i = 0; i < 3; ++i){
        size_t start = i * 11;
        uint16_t length = bitsToUint11(length_bits, start);
        lengths.push_back(length);
    }

    // 统计长度出现的频率
    std::unordered_map<uint16_t, int> length_freq;
    for(auto len : lengths){
        length_freq[len]++;
    }

    // 找出众数
    uint16_t agreed_length = 0;
    int max_freq = 0;
    for(auto &[len, freq] : length_freq){
        if(freq > max_freq){
            max_freq = freq;
            agreed_length = len;
        }
    }

    // 验证至少有两次长度相同
    if(max_freq < 2){
        std::cerr << "消息长度不一致，解码错误或该图未编码信息。" << std::endl;
        return "";
    }


    // 计算编码后的消息位长度
    size_t message_bits_length = agreed_length * 8 * 9 + 27; // 每个字节编码成9个比特

    // 检查是否有足够的位读取消息
    size_t total_required_bits = 9 * 3 * 11 + 27 + message_bits_length;
    std::vector<bool> all_bits;
    for(size_t i = 9 * 3 * 11 + 27; i < total_required_bits; ++i){
        if(order.size() > i && order[i] < P.size()){
            all_bits.push_back(P[order[i]]);
        }
    }

    if(all_bits.size() < message_bits_length){
        std::cerr << "解码后的比特流长度不足，无法提取完整消息。" << std::endl;
        return "";
    }

    // 提取消息位（编码后的比特）
    std::vector<bool> encoded_message_bits(all_bits);

    // 使用解码器对提取的比特进行解码
    std::vector<bool> decoded_bits = codec.decode(encoded_message_bits); // 解码后的比特长度 = encoded_message_bits.size() / 9

    // 将位转换为字节
    std::vector<unsigned char> decoded_bytes = bitsToBytes(decoded_bits);

    // 将字节转换为字符串
    std::string message = bytesToString(decoded_bytes);
    return message;
}
int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "用法:\n"
                  << "  隐写: " << argv[0] << " stego <输入图像> <输出图像> <消息> <步长> <密码>\n"
                  << "  解码: " << argv[0] << " decode <隐写图像> <步长> <密码>\n";
        return 1;
    }

    std::string mode = argv[1];
    if (mode == "stego") {
        if (argc != 7) {
            std::cerr << "隐写模式需要输入图像、输出图像、消息、步长和密码。\n";
            std::cerr << "用法: " << argv[0] << " stego <输入图像> <输出图像> <消息> <步长> <密码>\n";
            return 1;
        }
        std::string inputImage = argv[2];
        std::string outputImage = argv[3];
        std::string message = argv[4];
        float step_size = std::stof(argv[5]);
        std::string password = argv[6];

        if (stego_msg(inputImage, outputImage, message, step_size, password)) {
            std::cout << "隐写成功，输出图像为: " << outputImage << std::endl;
        } else {
            std::cerr << "隐写失败。\n";
        }
    } else if (mode == "decode") {
        if (argc != 5) {
            std::cerr << "解码模式需要隐写图像、步长和密码。\n";
            std::cerr << "用法: " << argv[0] << " decode <隐写图像> <步长> <密码>\n";
            return 1;
        }
        std::string stegoImage = argv[2];
        float step_size = std::stof(argv[3]);
        std::string password = argv[4];

        std::string message = decode_msg(stegoImage, step_size, password);
        if (!message.empty()) {
            std::cout << "解码消息: " << message << std::endl;
        } else {
            std::cerr << "解码失败或未找到有效消息。\n";
        }
    } else {
        std::cerr << "未知模式: " << mode << "\n";
        std::cerr << "可用模式: stego, decode\n";
        return 1;
    }

    return 0;
}
