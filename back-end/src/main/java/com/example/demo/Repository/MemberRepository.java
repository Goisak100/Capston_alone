package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{

}
