package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostingByBookDto {
    private String title;
    private String imageUrl;
    private String content;
    private String email; 
    private int like;
}
