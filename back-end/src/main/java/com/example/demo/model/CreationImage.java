package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "creation_images")
public class CreationImage {
    @Id
    private long id;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "book_id")
    private long bookId;

    @Column(name = "image_url")
    private String imageUrl;
}
