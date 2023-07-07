package com.example.demo.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Repository.BookRepository;
import com.example.demo.Repository.PostingRepository;
import com.example.demo.Repository.UserRepostiroy;
import com.example.demo.dto.UploadPostingDto;
import com.example.demo.entity.Book;
import com.example.demo.entity.Posting;
import com.example.demo.entity.User;

@Service
public class PostingService {

    private final UserRepostiroy userRepostiroy;
    private final BookRepository bookRepository;
    private final PostingRepository postingRepository;
    private final ImageService imageService;

    public PostingService(UserRepostiroy userRepostiroy,
            BookRepository bookRepository,
            PostingRepository postingRepository,
            ImageService imageService) {
        this.userRepostiroy = userRepostiroy;
        this.bookRepository = bookRepository;
        this.postingRepository = postingRepository;
        this.imageService = imageService;
    }

    @Transactional
    public void uploadPosting(UploadPostingDto uploadPostingDto) {
        String imageUrl = uploadPostingDto.getImageUrl();
        String prompt = uploadPostingDto.getPrompt();
        String content = uploadPostingDto.getContent();

        String email = uploadPostingDto.getEmail();
        User user = userRepostiroy.findByEmail(email).orElseThrow(() -> {
            throw new NoSuchElementException("Not found user by email: " + email);
        });

        String isbn = uploadPostingDto.getIsbn();
        Book book = bookRepository.findByIsbn(isbn).orElseThrow(() -> {
            throw new NoSuchElementException("Not found book by isbn: " + isbn);
        });

        Posting posting = new Posting();
        posting.setUser(user);
        posting.setBook(book);

        String filename = imageService.createUUID() + ".png";
        posting.setImageUrl(filename);
        posting.setPrompt(prompt);
        posting.setContent(content);
        posting.setLike(0);

        postingRepository.save(posting);
        imageService.createImage(imageUrl, filename);
    }
}