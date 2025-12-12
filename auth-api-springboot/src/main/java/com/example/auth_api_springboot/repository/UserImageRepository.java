package com.example.auth_api_springboot.repository;

import com.example.auth_api_springboot.entity.UserImage;
import com.example.auth_api_springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    Optional<UserImage> findByUser(User user);

    boolean existsByUser(User user);
}