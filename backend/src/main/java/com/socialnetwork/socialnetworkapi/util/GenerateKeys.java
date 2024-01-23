package com.socialnetwork.socialnetworkapi.util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import java.security.SecureRandom;
import java.util.Arrays;

public class GenerateKeys {

    public static void main(String[] args) {
        int numBytes = 256;
        byte[] randomBytes = generateRandomBytes(numBytes);

        System.out.println(Arrays.toString(randomBytes));
        System.out.println(generateKey(randomBytes));
    }

    private static String generateKey(byte[] bytes) {
        return Encoders.BASE64.encode(Keys.hmacShaKeyFor(bytes).getEncoded());
//        return Encoders.BASE64.encode(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());

    }
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
