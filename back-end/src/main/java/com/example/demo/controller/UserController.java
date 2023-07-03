package com.example.demo.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.OrderService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    
    private final UserService userService;
    private final OrderService orderService;

    public UserController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }

    @GetMapping("/test")
    public void test(@Param("address") String address) {
        userService.printUserDetail(address);
    }

    @GetMapping("/test2")
    public void test2() {
        userService.printUserDetailUsingQueryDSL();
    }

    @GetMapping("/test3")
    public void test3(@Param("orderId") Long orderId) {
        orderService.printOrderDetail(orderId);
    }
}
