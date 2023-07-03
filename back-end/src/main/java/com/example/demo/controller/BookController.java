package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookService;

@RestController
@RequestMapping("/api")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    
    @GetMapping("/getPostings")
    public List<Map<String, Object>> getPostings(@Param("isbn") String isbn) {
        return bookService.getPostings(isbn);
    }
}
