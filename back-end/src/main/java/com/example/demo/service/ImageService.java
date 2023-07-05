package com.example.demo.service;

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

    public ImageService(@Value("${openai.apiKey}") String apiKey) {
        this.API_KEY = apiKey;
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
}
