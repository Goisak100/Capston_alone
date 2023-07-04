package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface UserRepostiroy extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);
}
