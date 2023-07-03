package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.Repository.OrderRepository;
import com.example.demo.model.Book;
import com.example.demo.model.Order;
import com.example.demo.model.OrderDetail;
import com.example.demo.model.User;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void printOrderDetail(Long orderId) {
        // Order의 id는 기본키이다.
        Optional<Order> findOrder = orderRepository.findById(orderId);
        
        if (findOrder.isEmpty()) {
            System.out.println("왜 오더가 비어 있는가? order_id 잘못 입력한 듯");
            return;
        }
        Order order = findOrder.get();
        User user = order.getUser();
        System.out.println("주문자: " + user.getEmail());

        List<OrderDetail> orderDetails = order.getOrderDetails();
        for (OrderDetail orderDetail : orderDetails) {
            Book book = orderDetail.getBook();
            System.out.println("구매한 책: " + book.getTitle() + ", 수량: " + orderDetail.getQuantity());
        }
    }
}



// 오늘 배운 거
// 데이터베이스 테이블 설계할 때 연관관계를 잘 지정해 주어야 한다.
// 이게 JPA 엔티티 설계할 때 그대로 반영된다.

// 데이터베이스에서 테이블을 만들 때는 항상 Long(auto_increment) + 대체키의 조합을 사용하자.
// 나중에 골치가 덜 아파진다.

// 테이블에 외래키가 지정되어 있을 때 엔티티에서는 해당 외래키를 직접 참조하지 않는다.
// @OneToOne과 같은 연관관계 애노테이션을 이용해서 객체를 참조하게 만든다.

// 이때, 기본적으로는 단방향 설계해도 상관 없지만, 필요한 경우에는 양방향 설계를 해야 한다.
// 양방향 설계에서 중요한 것은 외래키를 관리하는 연관관계의 주인이다.
// 일반적으로 연관관계의 주인은 원래 외래키가 있는 테이블의 엔티티에 지정한다.
// 이를 지정하는 방법은 외래키가 참조하는 원본 테이블에서 @OneToOne과 같은 연관관계 애노테이션에서 mappedBy 속성을 지정하는 것이다.

// 연관관계의 주인인 엔티티에서는 fetch를 지정해서 FetchType.LAZY로 지정하는 게 중요하다.
// 이를 지정하지 않았을 때 EAGER로 될 수 있는데, 이렇게 되면 곧바로 조인이 돼서 즉시 실행되기 때문에 손해이다.


// 예전에 배웠던 것. 영속성과 준영속 상태에서 수정하려고 할 때 반영되지 않는 것
// 연관관계의 주인이 아닌 곳에서 다른 값을 수정하려고 하면, 반영되지 않는 것
//