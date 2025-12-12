package com.example.auth_api_springboot.service;

import com.example.auth_api_springboot.entity.User;
import com.example.auth_api_springboot.payload.UserCreateRequest;
import com.example.auth_api_springboot.payload.UserUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    List<User> getUsers();

    User getUserById(Long id);

    User updateUserById(Long id, UserUpdateRequest request);

    void deleteUserById(Long id);

    User addUserImage(Long id, MultipartFile file);

    User updateUserImage(Long id, MultipartFile file);
}
