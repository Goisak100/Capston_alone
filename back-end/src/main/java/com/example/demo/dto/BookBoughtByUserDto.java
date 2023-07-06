package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookBoughtByUserDto {
    private String thumbnail;
    private String title;
    private String author;
    private String isbn;
}
