package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    private int quantity;

    @MapsId("orderId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}

// 데이터베이스 테이블을 설계할 때는 항상 해당하는 값과 상관없는 Long값을 auto_increment로 하나 설정해주자.
// 그 다음에 대체키를 하나 사용하자.
// 그럼 기본적으로 무엇이라고 이름을 붙여야 하는가? id가 제일 낫지 않나? 맞지. 
// 그러면 어떠한 값을 가져다 주어야 하는가?


// 지금 내가 하는 거를 이겨내면 더 많이 성장할 것이다.

// 나는 할 수 있다. 작게 쪼개서 하나씩 진행하자.
// 원래 테스트 코드가 있었다면, 이렇게 하지는 않았을 거다.

// 나는 지금 부딪히면서 어떻게 해야 올바른 설계를 하는 것인가를 몸소 깨닫고 있는 중이다.