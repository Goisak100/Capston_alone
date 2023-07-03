package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.model.QBook;
import com.example.demo.model.QPosting;
import com.example.demo.model.QUser;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;

@Service
public class BookService {
    private final JPAQueryFactory jpaQueryFactory;
    private final QBook book = QBook.book;
    private final QPosting posting = QPosting.posting;
    private final QUser user = QUser.user;

    public BookService(EntityManager entityManager) {
        this.jpaQueryFactory = new JPAQueryFactory(entityManager);
    }

    public List<Map<String, Object>> getPostings(String isbn) {
        List<Tuple> tuples = jpaQueryFactory
            .select(book.title, posting.imageUrl, posting.content, user.email)
            .from(book)
            .where(book.isbn.eq(isbn))
            .join(book.postings, posting)
            .join(posting.user, user)
            .fetch();

        return tuples.stream()
            .map(tuple -> {
                Map<String, Object> map = new HashMap<>();
                map.put("title", tuple.get(book.title));
                map.put("imageUrl", tuple.get(posting.imageUrl));
                map.put("content", tuple.get(posting.content));
                map.put("email", tuple.get(user.email));
                return map;
            }).collect(Collectors.toList());
    }
}
