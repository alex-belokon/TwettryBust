package com.socialnetwork.socialnetworkapi.util;

import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import java.security.SecureRandom;
import java.util.Arrays;

@Slf4j
public class GenerateKeys {
    public static void main(String[] args) {
        int numBytes = 256;
        byte[] randomBytes = generateRandomBytes(numBytes);

        log.info(Arrays.toString(randomBytes));
        log.info(generateKey(randomBytes));
    }

    private static String generateKey(byte[] bytes) {return Encoders.BASE64.encode(Keys.hmacShaKeyFor(bytes).getEncoded());}
    private static byte[] generateRandomBytes(int numBytes) {
        // Создаем генератор случайных чисел
        SecureRandom secureRandom = new SecureRandom();
        // Создаем массив байтов указанной длины
        byte[] randomBytes = new byte[numBytes];
        // Генерируем случайные байты
        secureRandom.nextBytes(randomBytes);

        return randomBytes;
    }
}
