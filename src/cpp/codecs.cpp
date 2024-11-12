#include <vector>
#include <string>
#include <cstdint>
#include <algorithm>
#include <numeric>
#include <unordered_map>
#include <bitset>
#include <cmath>
#include <cstring>
#include <random>
#include <iostream>
#include <iomanip>
#include <cassert>
#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>

// Helper function to generate a deterministic permutation based on password using mt19937
std::vector<uint16_t> generate_permutation(const std::string& password) {
    std::vector<uint16_t> O(65536);
    std::iota(O.begin(), O.end(), 0);

    // Create a seed from the password using a hash function
    std::hash<std::string> hasher;
    size_t seed = hasher(password);

    // Initialize mt19937 with the seed (use lower 32 bits)
    std::mt19937 rng(static_cast<uint32_t>(seed));

    // Shuffle the vector O using mt19937
    std::shuffle(O.begin(), O.end(), rng);

    return O;
}

// Helper function to convert bytes to bits
std::vector<uint8_t> bytes_to_bits(const std::vector<uint8_t>& bytes) {
    std::vector<uint8_t> bits;
    bits.reserve(bytes.size() * 8);
    for (auto byte : bytes) {
        for (int i = 7; i >= 0; --i) {
            bits.push_back((byte >> i) & 1);
        }
    }
    return bits;
}

// Helper function to create a 10-bit unsigned integer from bits
uint16_t make_unsigned_int_10bit(const std::vector<uint8_t>& bits) {
    uint16_t value = 0;
    for (auto bit : bits) {
        value = (value << 1) | (bit & 1);
    }
    return value;
}

// Encode function
std::vector<uint8_t> encode(const std::vector<uint8_t>& raw_data, const std::string& password) {
    // Step 1: Check raw_data size
    if (raw_data.size() > 1023) {
        // Encode error: raw_data too large
        return std::vector<uint8_t>();
    }

    // Step 2: Generate permutation O based on password using mt19937
    std::vector<uint16_t> O = generate_permutation(password);

    // Step 3: Encode the length L as 10-bit unsigned integer
    uint16_t L = static_cast<uint16_t>(raw_data.size());
    std::bitset<10> L_bits_set(L);
    std::vector<uint8_t> L_bit_array;
    L_bit_array.reserve(10);
    for (int i = 9; i >= 0; --i) {
        L_bit_array.push_back(L_bits_set[i]);
    }

    // Step 4: Convert raw_data to bit array D
    std::vector<uint8_t> D = bytes_to_bits(raw_data);

    // Step 5: Compose raw_bit_message as L + L + L
    std::vector<uint8_t> raw_bit_message;
    raw_bit_message.reserve(30); // 3*10 + D.size()
    raw_bit_message.insert(raw_bit_message.end(), L_bit_array.begin(), L_bit_array.end());
    raw_bit_message.insert(raw_bit_message.end(), L_bit_array.begin(), L_bit_array.end());
    raw_bit_message.insert(raw_bit_message.end(), L_bit_array.begin(), L_bit_array.end());
    // raw_bit_message.insert(raw_bit_message.end(), D.begin(), D.end());

    // Step 6: Initialize P as a vector of 65536 zeros
    std::vector<uint8_t> P(65536, 0);

    // Step 7: Encode each bit 9 times
    for (size_t i = 0; i < raw_bit_message.size(); ++i) {
        uint8_t bit = raw_bit_message[i];
        for (int k = 0; k < 9; ++k) {
            size_t pos = i * 9 + k;
            if (pos >= 65536) break; // Prevent out-of-bounds
            uint16_t index = O[pos];
            P[index] = bit;
        }
    }

    // calculate repeat times
    size_t repeat = (65536 - 270) / (L * 8);
    for (size_t i = 0; i < D.size(); ++i) {
        for (int k = 0; k < repeat; ++k) {
            size_t pos = 270 + i * repeat + k;
            if (pos >= 65536) break; // Prevent out-of-bounds
            uint16_t index = O[pos];
            P[index] = D[i];
        }
    }

    return P;
}

// Decode function
std::vector<uint8_t> decode(const std::vector<float>& coded_data, const std::string& password) {
    // Step 1: Check coded_data size
    if (coded_data.size() != 65536) {
        // Decode error: invalid coded_data size
        return std::vector<uint8_t>();
    }

    // Step 2: Generate permutation O based on password using mt19937
    std::vector<uint16_t> O = generate_permutation(password);

    size_t current_pos = 0;

    // Step 3: Define decode_bit as a lambda function
    auto decode_bit = [&](std::vector<uint8_t>& bits_out, size_t repeat) -> uint8_t {
        std::vector<uint8_t> bit_1_01;
        std::vector<float> fc_prob_1_01;
        bit_1_01.reserve(repeat);
        fc_prob_1_01.reserve(repeat);

        // Read 9 bits
        for (int i = 0; i < repeat; ++i) {
            if (current_pos >= 65536) break; // Prevent out-of-bounds
            float prob = coded_data[O[current_pos++]];
            uint8_t bit = (prob > 0.0f) ? 1 : 0;
            bit_1_01.push_back(bit);
            fc_prob_1_01.push_back(prob);
        }

        // Count occurrences of 0 and 1
        std::unordered_map<uint8_t, int> bit_count;
        for (auto bit : bit_1_01) {
            bit_count[bit]++;
        }

        // Determine majority bit
        uint8_t majority_bit = 0;
        int max_count = 0;
        for (const auto& pair : bit_count) {
            if (pair.second > max_count) {
                max_count = pair.second;
                majority_bit = pair.first;
            }
        }

        if (max_count >= 0.7 * repeat) { // At least 70% bits of the same number
            return majority_bit;
        }

        // If no majority, compute sigmoid(mean) > 0.5
        float sum_sigmoid = 0.0f;
        for (auto bit : fc_prob_1_01) {
            // Since bits are 0 or 1, sigmoid(bit) is sigmoid(0)=0.5 or sigmoid(1)=~0.731
            sum_sigmoid += 1.0f / (1.0f + std::exp(-bit));
        }
        float mean_sigmoid = sum_sigmoid / bit_1_01.size();
        return (mean_sigmoid > 0.5f) ? 1 : 0;
    };
    // auto decode_bit = [&](std::vector<uint8_t>& bits_out) -> uint8_t {
    //     std::vector<uint8_t> bit_1_01;
    //     bit_1_01.reserve(9);
    //     std::vector<float> fc_prob_1_01;
    //     fc_prob_1_01.reserve(9);

    //     // Read 9 bits
    //     for (int i = 0; i < 9; ++i) {
    //         if (current_pos >= 65536) break; // Prevent out-of-bounds
    //         float prob = coded_data[O[current_pos++]];
    //         uint8_t bit = (prob > 0.0f) ? 1 : 0;
    //         bit_1_01.push_back(bit);
    //         fc_prob_1_01.push_back(prob);
    //     }

    //     // Compute sigmoid for each bit and calculate the mean
    //     float sum_sigmoid = 0.0f;
    //     for (auto bit : fc_prob_1_01) {
    //         sum_sigmoid += 1.0f / (1.0f + std::exp(-bit));
    //     }
    //     float mean_sigmoid = sum_sigmoid / bit_1_01.size();

    //     if (mean_sigmoid > 0.7f) {
    //         return 1;
    //     } else if (mean_sigmoid < 0.3f) {
    //         return 0;
    //     } else {
    //         // Determine majority bit
    //         std::unordered_map<uint8_t, int> bit_count;
    //         for (auto bit : bit_1_01) {
    //             bit_count[bit]++;
    //         }

    //         uint8_t majority_bit = 0;
    //         int max_count = 0;
    //         for (const auto& pair : bit_count) {
    //             if (pair.second > max_count) {
    //                 max_count = pair.second;
    //                 majority_bit = pair.first;
    //             }
    //         }

    //         return majority_bit;
    //     }
    // };
    // Step 4: Decode the length L by reading it three times
    std::vector<uint16_t> decoded_len;
    for (int i = 0; i < 3; ++i) {
        std::vector<uint8_t> int_bits;
        int_bits.reserve(10);
        for (int p = 0; p < 10; ++p) {
            uint8_t bit = decode_bit(int_bits, 9);
            int_bits.push_back(bit);
        }
        uint16_t uint_len = make_unsigned_int_10bit(int_bits);
        decoded_len.push_back(uint_len);
    }

    // Step 5: Determine the most common L
    std::unordered_map<uint16_t, int> decoded_len_count;
    for (auto len : decoded_len) {
        decoded_len_count[len]++;
    }

    uint16_t dlen = 0;
    int max_len_count = 0;
    for (const auto& pair : decoded_len_count) {
        if (pair.second > max_len_count) {
            max_len_count = pair.second;
            dlen = pair.first;
        }
    }

    if (max_len_count < 2) { // No common value
        return std::vector<uint8_t>(); // Decode failed
    }

    // Step 6: Decode the message based on dlen
    std::vector<uint8_t> msg;
    msg.reserve(dlen);
    size_t repeat = (65536 - 270) / (dlen * 8);
    for (size_t i = 0; i < dlen; ++i) {
        std::vector<uint8_t> byte_bits;
        byte_bits.reserve(8);
        for (int j = 0; j < 8; ++j) {
            uint8_t bit = decode_bit(byte_bits, repeat);
            byte_bits.push_back(bit);
        }
        // Convert bits to byte
        uint8_t byte = 0;
        for (auto bit : byte_bits) {
            byte = (byte << 1) | (bit & 1);
        }
        msg.push_back(byte);
    }

    return msg;
}

// Emscripten interface functions
emscripten::val encodeToBits(emscripten::val data_bytes, emscripten::val password) {
    // Convert data_bytes to std::vector<uint8_t>
    std::vector<uint8_t> raw_data = emscripten::convertJSArrayToNumberVector<uint8_t>(data_bytes);

    // Convert password to std::string
    std::string pwd = password.as<std::string>();

    // Call encode function
    std::vector<uint8_t> P = encode(raw_data, pwd);

    // If P is empty, return null
    if (P.empty()) {
        return emscripten::val::null();
    }

    // Convert P to JS Uint8Array
    emscripten::val result = emscripten::val::global("Uint8Array").new_(emscripten::typed_memory_view(P.size(), P.data()));

    return result;
}

emscripten::val decodeToBytes(emscripten::val data_probs, emscripten::val password) {
    // Convert data_probs to std::vector<float>
    std::vector<float> coded_data = emscripten::convertJSArrayToNumberVector<float>(data_probs);

    // Convert password to std::string
    std::string pwd = password.as<std::string>();

    // Call decode function
    std::vector<uint8_t> msg = decode(coded_data, pwd);

    // If msg is empty, return null
    if (msg.empty()) {
        return emscripten::val::null();
    }

    // Convert msg to JS Uint8Array
    emscripten::val result = emscripten::val::global("Uint8Array").new_(emscripten::typed_memory_view(msg.size(), msg.data()));

    return result;
}
EMSCRIPTEN_BINDINGS() {
    emscripten::function("encodeToBits", &encodeToBits);
    emscripten::function("decodeToBytes", &decodeToBytes);
}