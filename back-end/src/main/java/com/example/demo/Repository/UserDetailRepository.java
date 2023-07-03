package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UserDetail;

public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {
    public List<UserDetail> findByAddressLike(String address);
}
