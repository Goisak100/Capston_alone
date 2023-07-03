package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Repository.UserRepository;
import com.example.demo.model.User;
import com.example.demo.model.UserDetail;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void printUserDetail() {
        List<User> users = userRepository.findAll();

        for (User user: users) {
            UserDetail userDetail = user.getUserDetail();

            System.out.println(user.getEmail() + " / " + userDetail.getAddress() + " / " + userDetail.getPhoneNumber());
        }
    }
}
