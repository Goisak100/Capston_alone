package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.BookRepository;
import com.example.demo.dto.PostingByBookDto;
import com.example.demo.entity.Book;
import com.example.demo.entity.Posting;
import com.example.demo.entity.User;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<PostingByBookDto> getPostingsByBook(String isbn) {
        Optional<Book> optionalBook = bookRepository.findByIsbn(isbn);
        Book book = optionalBook.orElseThrow(() -> {
            return new NoSuchElementException("Book not found using isbn");
        });

        List<Posting> postings = book.getPostings();
        List<PostingByBookDto> postingsByBookDto = new ArrayList<>();
        for (Posting posting : postings) {
            User user = posting.getUser();
            PostingByBookDto postingByBookDto = new PostingByBookDto(
                book.getTitle(),
                posting.getImageUrl(),
                posting.getContent(),
                user.getEmail()
            );
            postingsByBookDto.add(postingByBookDto);
        }

        return postingsByBookDto;
    }
}
