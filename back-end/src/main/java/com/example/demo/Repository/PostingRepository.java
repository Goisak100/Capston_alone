package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Posting;

public interface PostingRepository extends JpaRepository<Posting, Long> {
}
