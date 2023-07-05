package com.example.demo.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ImageService;

@RestController
@RequestMapping("/api")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/getImageUrl")
    public String getImageUrl(@Param("prompt") String prompt) {
        return imageService.getImageUrl(prompt); // imageService.createImage(prompt).getImageUrl()로 설정하면 더 베스트
    }
}
