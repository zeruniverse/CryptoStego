#include <iostream>
#include <vector>
#include <cstdint>
#include <stdexcept>
#include <limits>
#include <random>
#include <algorithm>

class ConvolutionalCodec {
public:
    // 构造函数：初始化生成多项式和约束长度
    ConvolutionalCodec()
        : generatorPolys_{
            0b1101, // 0o15
            0b1011, // 0o13
            0b1111, // 0o17
            0b1001, // 0o11
            0b1100, // 0o14
            0b1010, // 0o12
            0b1110, // 0o16
            0b1000, // 0o10
            0b1101  // 0o15
          },
          constraintLength_(4),
          numStates_(1 << (constraintLength_ - 1)) // 2^(K-1)
    {}

    // 编码函数
    std::vector<bool> encode(const std::vector<bool>& input) const {
        std::vector<bool> output;
        uint16_t shiftRegister = 0; // 使用16位寄存器以适应更大的约束长度

        // 遍历每一个输入比特
        for (bool bit : input) {
            // 更新移位寄存器：左移并加入新比特
            shiftRegister = ((shiftRegister << 1) | (bit ? 1 : 0)) & ((1 << constraintLength_) - 1);

            // 对每个生成多项式计算输出比特
            for (const auto& poly : generatorPolys_) {
                bool outBit = calculateParity(shiftRegister & poly);
                output.push_back(outBit);
            }
        }

        // 添加尾比特，使状态回到零状态
        for (int i = 0; i < constraintLength_ - 1; ++i) {
            shiftRegister = (shiftRegister << 1) & ((1 << constraintLength_) - 1);
            for (const auto& poly : generatorPolys_) {
                bool outBit = calculateParity(shiftRegister & poly);
                output.push_back(outBit);
            }
        }

        return output;
    }

    // 解码函数
    std::vector<bool> decode(const std::vector<bool>& received) const {
        // 检查接收比特数是否是码率的倍数
        if (received.size() % generatorPolys_.size() != 0) {
            throw std::invalid_argument("接收的比特流长度不是码率的整数倍。");
        }

        size_t numTimeSteps = received.size() / generatorPolys_.size();
        size_t K = constraintLength_;

        // 初始化路径度量和路径记录
        std::vector<std::vector<double>> pathMetrics(numTimeSteps + 1, std::vector<double>(numStates_, std::numeric_limits<double>::infinity()));
        std::vector<std::vector<int>> paths(numTimeSteps + 1, std::vector<int>(numStates_, -1));

        // 初始状态为 0，度量为 0
        pathMetrics[0][0] = 0.0;

        // 维特比算法主循环
        for (size_t t = 0; t < numTimeSteps; ++t) {
            for (int currentState = 0; currentState < numStates_; ++currentState) {
                if (pathMetrics[t][currentState] == std::numeric_limits<double>::infinity()) {
                    continue; // 无效路径
                }

                // 对于每个可能的输入比特（0或1）
                for (int inputBit = 0; inputBit <= 1; ++inputBit) {
                    // 计算下一个状态
                    int nextState = ((currentState << 1) | inputBit) & (numStates_ - 1);

                    // 计算期望输出
                    std::vector<bool> expectedOutput;
                    uint16_t tempRegister = ((currentState << 1) | inputBit) & ((1 << constraintLength_) - 1);
                    for (const auto& poly : generatorPolys_) {
                        bool outBit = calculateParity(tempRegister & poly);
                        expectedOutput.push_back(outBit);
                    }

                    // 获取接收的当前时间步的输出比特
                    std::vector<bool> receivedBits(received.begin() + t * generatorPolys_.size(),
                                                  received.begin() + (t + 1) * generatorPolys_.size());

                    // 计算汉明距离
                    double metric = pathMetrics[t][currentState];
                    for (size_t i = 0; i < generatorPolys_.size(); ++i) {
                        if (expectedOutput[i] != receivedBits[i]) {
                            metric += 1.0;
                        }
                    }

                    // 更新路径度量和路径记录
                    if (metric < pathMetrics[t + 1][nextState]) {
                        pathMetrics[t + 1][nextState] = metric;
                        paths[t + 1][nextState] = currentState;
                    }
                }
            }
        }

        // 回溯路径，寻找最优路径
        int finalState = 0; // 强制最终状态为零状态

        // 如果零状态不可达，则选择度量最小的状态
        if (paths[numTimeSteps][finalState] == -1) {
            double minMetric = std::numeric_limits<double>::infinity();
            for (int state = 0; state < numStates_; ++state) {
                if (pathMetrics[numTimeSteps][state] < minMetric && paths[numTimeSteps][state] != -1) {
                    minMetric = pathMetrics[numTimeSteps][state];
                    finalState = state;
                }
            }
        }

        // 回溯路径，恢复输入比特
        std::vector<bool> decodedBits(numTimeSteps, false);
        int currentState = finalState;

        for (int t = numTimeSteps; t > 0; --t) {
            int prevState = paths[t][currentState];
            if (prevState == -1) {
                throw std::runtime_error("解码失败：在回溯过程中遇到无效状态。");
            }
            // 输入比特是 currentState 的最低位
            bool inputBit = currentState & 1;
            decodedBits[t - 1] = inputBit;
            currentState = prevState;
        }

        // 移除尾部的 (constraintLength_ - 1) 个比特
        if (decodedBits.size() >= static_cast<size_t>(constraintLength_ - 1)) {
            decodedBits.resize(decodedBits.size() - (constraintLength_ - 1));
        } else {
            throw std::runtime_error("解码后的比特流长度不足，无法移除尾部比特。");
        }

        return decodedBits;
    }

private:
    std::vector<uint8_t> generatorPolys_; // 生成多项式
    int constraintLength_;                // 约束长度
    int numStates_;                       // 状态数

    // 计算奇偶校验位的辅助函数
    bool calculateParity(uint16_t x) const {
        bool result = false;
        while (x) {
            result ^= (x & 1);
            x >>= 1;
        }
        return result;
    }
};