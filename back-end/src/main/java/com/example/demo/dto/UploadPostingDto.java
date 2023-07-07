package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadPostingDto {
    private String isbn;
    private String imageUrl;
    private String content;
    private String prompt;
    private String email;
}