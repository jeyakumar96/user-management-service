package com.example.auth_api_springboot.controller;

import com.example.auth_api_springboot.entity.User;
import com.example.auth_api_springboot.payload.ApiResponse;
import com.example.auth_api_springboot.payload.UserResponse;
import com.example.auth_api_springboot.payload.UserUpdateRequest;
import com.example.auth_api_springboot.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    public ResponseEntity<ApiResponse> getUsers() {
        List<User> users = userService.getUsers();
        List<UserResponse> data = users.stream().map(this::toResponse).collect(Collectors.toList());
        ApiResponse resp = new ApiResponse("Get Users Success!", data);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        ApiResponse resp = new ApiResponse("Get User Success!", toResponse(user));
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateUserById(@PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        User user = userService.updateUserById(id, request);
        ApiResponse resp = new ApiResponse("Update User Success!", toResponse(user));
        return ResponseEntity.ok(resp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        ApiResponse resp = new ApiResponse("Delete User Successfully!", Map.of("id", id));
        return ResponseEntity.ok(resp);
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles() == null ? null
                        : user.getRoles().stream().map(r -> r.getName()).collect(java.util.stream.Collectors.toSet()));
    }
}
