package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);
}
