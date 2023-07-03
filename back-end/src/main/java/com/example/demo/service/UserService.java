package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Repository.UserDetailRepository;
import com.example.demo.model.QUser;
import com.example.demo.model.QUserDetail;
import com.example.demo.model.User;
import com.example.demo.model.UserDetail;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;

@Service
public class UserService {
    private final UserDetailRepository userDetailRepository;
    private final JPAQueryFactory jpaQueryFactory;
    private final QUser user = QUser.user;
    private final QUserDetail userDetail = QUserDetail.userDetail;

    public UserService(UserDetailRepository userDetailRepository, EntityManager entityManager) {
        this.userDetailRepository = userDetailRepository;
        this.jpaQueryFactory = new JPAQueryFactory(entityManager);
    }

    // email은 users 테이블에 있기 때문에 users에서 검색하는 게 맞다.
    // 만약에 address를 기반으로 검색을 하고 싶었으면, userDeatilRepository에서 해야 한다.
    public void printUserDetail(String address) {
        List<UserDetail> userDetails = userDetailRepository.findByAddressLike("%" + address + "%");

        if(userDetails.size() == 0) {
            System.out.println("널이라네~~~");
        }
        for (UserDetail userDetail : userDetails) {
            User user = userDetail.getUser();

            System.out.println(user.getEmail() + " / " + userDetail.getAddress() + " / " + userDetail.getPhoneNumber());
        }
    }

    public void printUserDetailUsingQueryDSL() {
        
        List<Tuple> userDetails = jpaQueryFactory
            .select(user.email, userDetail.address, userDetail.phoneNumber)
            .from(user)
            .join(user.userDetail, userDetail)
            .fetch(); 

        for (Tuple tuple : userDetails) {
            System.out.println(tuple.get(user.email));
            System.out.println(tuple.get(userDetail.address));
            System.out.println(tuple.get(userDetail.phoneNumber));
        }
    }
}
