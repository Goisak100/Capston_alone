package com.example.demo.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Member;

@Repository
public class TestRepository {
    private final JdbcTemplate jdbcTemplate;

    public TestRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Member> getMembers() {
        String sql = "select * from member";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            return new Member(
                rs.getLong("id"),
                rs.getString("name"),
                rs.getInt("age")
            );
        });
    }
}
