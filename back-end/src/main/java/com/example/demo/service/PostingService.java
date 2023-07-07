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

    public PostingService(UserRepostiroy userRepostiroy,
            BookRepository bookRepository,
            PostingRepository postingRepository) {
        this.userRepostiroy = userRepostiroy;
        this.bookRepository = bookRepository;
        this.postingRepository = postingRepository;
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


        // 내가 생각할 수 있는 문제점
        // GeneratedValue가 설정된 Long id 값을 어떻게 지정해야 하지?
        // 생성자에서 지정하지 않으면 자동으로 0이 들어가는데, 이는 어떻게 처리되는 거지?
        // 일단 이것도 확인은 해야 한다.
        Posting posting = new Posting();
        posting.setUser(user);
        posting.setBook(book);
        posting.setImageUrl(imageUrl);
        posting.setPrompt(prompt);
        posting.setContent(content);
        posting.setLike(0);

        
        // 연관관계가 지정된 객체는 어떤 식으로 지정해주어야 하는가?
        // 이를 이용해서 알아서 잘 할당해주는가?
        postingRepository.save(posting);
    }
}
