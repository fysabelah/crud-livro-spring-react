package com.teste.crudlivro.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

import static java.nio.charset.StandardCharsets.UTF_8;

public final class Message {
    public static Properties props = load();

    private static Properties load() {
        Properties props = new Properties();
        try (FileInputStream fs = new FileInputStream("src/main/resources/message.properties")) {
            InputStreamReader isr = new InputStreamReader(fs, UTF_8);
            props.load(isr);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return props;
    }

    public static String get(String key) {
        return props.getProperty(key);
    }
}
