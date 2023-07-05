package com.example.demo.controller;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BookBoughtByUserDto;
import com.example.demo.dto.PostingByBookDto;
import com.example.demo.service.BookService;

@RestController
@RequestMapping("/api")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/getPostingsByBook")
    public ResponseEntity<List<PostingByBookDto>> getPostingsByBook(@Param("isbn") String isbn) {
        List<PostingByBookDto> postings = bookService.getPostingsByBook(isbn);
        return ResponseEntity.ok().body(postings);
    }

    @GetMapping("/getPostingsByUser")
    public ResponseEntity<List<PostingByBookDto>> getPostingsByUser(@Param("email") String email) {
        List<PostingByBookDto> postings = bookService.getPostingsByUser(email);
        return ResponseEntity.ok().body(postings);
    }

    @PostMapping("/getUserBoughtBooks")
    public ResponseEntity<List<BookBoughtByUserDto>> getUserBoughtBooks(@Param("email") String email) {
        List<BookBoughtByUserDto> booksBoughtByUserDto = bookService.getBooksBoughtByUserDto(email);
        return ResponseEntity.ok().body(booksBoughtByUserDto);
    }
}
