package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.BookRepository;
import com.example.demo.Repository.UserRepostiroy;
import com.example.demo.dto.PostingByBookDto;
import com.example.demo.entity.Book;
import com.example.demo.entity.Posting;
import com.example.demo.entity.User;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepostiroy userRepostiroy;

    public BookService(BookRepository bookRepository, UserRepostiroy userRepository) {
        this.bookRepository = bookRepository;
        this.userRepostiroy = userRepository;
    }

    public List<PostingByBookDto> getPostingsByBook(String isbn) {
        Optional<Book> optionalBook = bookRepository.findByIsbn(isbn);
        Book book = optionalBook.orElseThrow(() -> {
            return new NoSuchElementException("Book not found by isbn");
        });

        List<Posting> postings = book.getPostings();
        List<PostingByBookDto> postingsByBookDto = getPostingsByBookDto(postings);

        return postingsByBookDto;
    }

    public List<PostingByBookDto> getPostingsByUser(String email) {
        Optional<User> optionalUser = userRepostiroy.findByEmail(email);
        User user = optionalUser.orElseThrow(() -> {
            return new NoSuchElementException("Not found user by email");
        });

        List<Posting> potings = user.getPostings();
        List<PostingByBookDto> postingsByBookDto = getPostingsByBookDto(potings);

        return postingsByBookDto;
    }

    private List<PostingByBookDto> getPostingsByBookDto(List<Posting> postings) {
        List<PostingByBookDto> result = new ArrayList<>();
        for (Posting posting : postings) {
            PostingByBookDto postingByBookDto = getPostingByBookDto(posting);
            result.add(postingByBookDto);
        }
        return result;
    }

    private PostingByBookDto getPostingByBookDto(Posting posting) {
        User user = posting.getUser();
        Book book = posting.getBook();
        return new PostingByBookDto(
                book.getTitle(),
                posting.getImageUrl(),
                posting.getContent(),
                user.getEmail(),
                posting.getLike());
    }
}
