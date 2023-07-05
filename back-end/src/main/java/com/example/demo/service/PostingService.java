package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.Repository.PostingRepository;

@Service
public class PostingService {
    private final PostingRepository postingRepository;

    public PostingService(PostingRepository postingRepository) {
        this.postingRepository = postingRepository;
    }

    // 생성한 이미지를 받아서 mysql에 저장하는 과정이 필요하다.
    // mysql에 저장할 때는 이미지의 경로를 저장한다.
    // 즉, 여기에서는 이미지를 저장하는 걸 처리하지 않는다?

    // 이미지 생성까지는 하나에서 별도로 실행되면 된다.
    // 이미지를 업로드하는 게 관건이다.

    // 이미지 생성하는 건 별도의 repository를 사용하지 않는다.
}
