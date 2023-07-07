package com.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UploadPostingDto;
import com.example.demo.service.PostingService;

@RestController
@RequestMapping("/api")
public class PostingController {
    private final PostingService postingService;

    public PostingController(PostingService postingService) {
        this.postingService = postingService;
    }

    @PostMapping("/uploadPosting")
    public void uploadPosting(@RequestBody UploadPostingDto uploadPostingDto) {
        System.out.println(uploadPostingDto.getEmail());

        postingService.uploadPosting(uploadPostingDto);
    }
}
