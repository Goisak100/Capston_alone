package com.example.demo.service;

import java.io.File;
import java.net.URL;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Service
public class ImageService {
    // 여기에서 입력받은 프롬프트를 기반으로 이미지를 생성해서 url을 반환하는 코드를 작성한다.

    private final String API_URL = "https://api.openai.com/v1/images/generations";
    private final String API_KEY;
    private final String SAVE_FILE_PATH;

    public ImageService(
            @Value("${openai.apiKey}") String apiKey,
            @Value("${image.saveFilePath}") String saveFilePath) {
        this.API_KEY = apiKey;
        this.SAVE_FILE_PATH = saveFilePath;
    }

    public String[] getImageUrl(String prompt) {

        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "image-alpha-001");
        requestBody.put("prompt", prompt);
        requestBody.put("num_images", 4);
        requestBody.put("size", "1024x1024");
        requestBody.put("response_format", "url");

        OkHttpClient client = new OkHttpClient();

        RequestBody body = RequestBody.create(requestBody.toString(),
                MediaType.parse("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(body)
                .addHeader("Authorization", "Bearer " + API_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("HTTP request failed: " + response);
            }

            JSONObject jsonObject = new JSONObject(response.body().string());

            String[] urls = new String[4];
            urls[0] = jsonObject.getJSONArray("data").getJSONObject(0).getString("url");
            urls[1] = jsonObject.getJSONArray("data").getJSONObject(1).getString("url");
            urls[2] = jsonObject.getJSONArray("data").getJSONObject(2).getString("url");
            urls[3] = jsonObject.getJSONArray("data").getJSONObject(3).getString("url");

            return urls;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    // 1. 이미지 url에 접근해서 png 파일로 저장해야 한다.
    public void createImage(String imageUrl, String filename) {
        try {
            URL url = new URL(imageUrl);

            // 3. 로컬과 서버 경로를 다르게 저장해야 한다.
            File file = new File(Paths.get(SAVE_FILE_PATH, filename).toString());

            FileUtils.copyURLToFile(url, file);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public String createUUID() {
        return UUID.randomUUID().toString();
    }

    // 4. 클라이언트에서 해당 링크를 호출했을 때 접근할 수 있게 해야 한다.
}
