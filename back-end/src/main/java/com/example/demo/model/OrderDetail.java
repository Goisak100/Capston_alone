package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_detail")
@IdClass(OrderDetailId.class)
public class OrderDetail {

    @Id
    @Column(name = "order_id")
    private long orderId;

    @Id
    @Column(name = "user_id")
    private long userId;

    @Column(name = "book_id")
    private long bookId;
    private int quantity;
}