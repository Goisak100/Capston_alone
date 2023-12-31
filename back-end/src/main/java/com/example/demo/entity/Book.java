package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String author;
    private String translator;
    private String publisher;

    @Column(name = "date_time")
    private LocalDateTime dateTime;
    private String thumbnail;
    private String isbn;
    private int price;

    @OneToMany(mappedBy = "book")
    private List<OrderDetail> orderDetails;


    @OneToMany(mappedBy = "book")
    private List<Posting> postings;
}