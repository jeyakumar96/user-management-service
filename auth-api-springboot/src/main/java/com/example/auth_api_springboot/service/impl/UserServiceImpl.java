package com.example.auth_api_springboot.service.impl;

import com.example.auth_api_springboot.entity.User;
import com.example.auth_api_springboot.exception.APIException;
import com.example.auth_api_springboot.exception.ResourceNotFoundException;
import com.example.auth_api_springboot.payload.UserUpdateRequest;
import com.example.auth_api_springboot.repository.UserRepository;
import com.example.auth_api_springboot.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public User updateUserById(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        // If username changes, ensure uniqueness
        if (request.getUsername() != null && !request.getUsername().isBlank()
                && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new APIException(HttpStatus.BAD_REQUEST, "Username is already exists!.");
            }
            user.setUsername(request.getUsername());
        }

        // If email changes, ensure uniqueness
        if (request.getEmail() != null && !request.getEmail().isBlank()
                && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new APIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return userRepository.save(user);
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }
}
