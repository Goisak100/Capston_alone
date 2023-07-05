package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.BookRepository;
import com.example.demo.Repository.UserRepostiroy;
import com.example.demo.dto.BookBoughtByUserDto;
import com.example.demo.dto.PostingByBookDto;
import com.example.demo.entity.Book;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderDetail;
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

    // isbn 기반으로 책을 검색하고, 해당 책을 대상으로 쓰인 포스팅 목록 가져오기
    public List<PostingByBookDto> getPostingsByBook(String isbn) {
        Book book = bookRepository.findByIsbn(isbn).orElseThrow(() -> {
            return new NoSuchElementException("Book not found by isbn: " + isbn);
        });

        List<Posting> postings = book.getPostings();
        List<PostingByBookDto> postingsByBookDto = getPostingsByBookDto(postings);

        return postingsByBookDto;
    }

    // email 기반으로 책을 검색하고, 해당 책을 대상으로 쓰인 포스팅 목록 가져오기
    public List<PostingByBookDto> getPostingsByUser(String email) {
        User user = userRepostiroy.findByEmail(email).orElseThrow(() -> {
            return new NoSuchElementException("Not found user by email: " + email);
        });

        List<Posting> potings = user.getPostings();
        List<PostingByBookDto> postingsByBookDto = getPostingsByBookDto(potings);

        return postingsByBookDto;
    }

    // email 기반으로 유저가 구매한 책 목록을 가져온다. 중복을 제거해서.
    public List<BookBoughtByUserDto> getBooksBoughtByUserDto(String email) {
        User user = userRepostiroy.findByEmail(email).orElseThrow(() -> {
            return new NoSuchElementException("Not found user by email: " + email);
        });

        List<Order> orders = user.getOrders();
        List<BookBoughtByUserDto> booksBoughtByUserDto = new ArrayList<>();
        for (Order order : orders) {

            List<Book> books = new ArrayList<>();
            List<OrderDetail> orderDetails = order.getOrderDetails();
            for (OrderDetail orderDetail : orderDetails) {
                Book book = orderDetail.getBook();
                if (!books.contains(book)) {
                    books.add(book);
                }
            }

            for (Book book : books) {
                BookBoughtByUserDto bookBoughtByUserDto = new BookBoughtByUserDto(
                        book.getThumbnail(),
                        book.getTitle(),
                        book.getAuthor());

                booksBoughtByUserDto.add(bookBoughtByUserDto);
            }
        }

        return booksBoughtByUserDto;
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