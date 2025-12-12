package com.example.auth_api_springboot.controller;

import com.example.auth_api_springboot.entity.User;
import com.example.auth_api_springboot.payload.ApiResponse;
import com.example.auth_api_springboot.payload.UserResponse;
import com.example.auth_api_springboot.payload.UserUpdateRequest;
import com.example.auth_api_springboot.service.UserService;
import com.example.auth_api_springboot.entity.UserImage;
import com.example.auth_api_springboot.repository.UserImageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserImageRepository userImageRepository;

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

    @PostMapping("/{id}/image")
    public ResponseEntity<ApiResponse> addUserImage(@PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        User user = userService.addUserImage(id, file);
        ApiResponse resp = new ApiResponse("Add User Image Success!", toResponse(user));
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<ApiResponse> updateUserImage(@PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        User user = userService.updateUserImage(id, file);
        ApiResponse resp = new ApiResponse("Update User Image Success!", toResponse(user));
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getUserImage(@PathVariable Long id) {
        User user = userService.getUserById(id);
        java.util.Optional<UserImage> opt = userImageRepository.findByUser(user);
        if (opt.isEmpty() || opt.get().getData() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserImage img = opt.get();
        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
        if (img.getContentType() != null) {
            try {
                mediaType = MediaType.parseMediaType(img.getContentType());
            } catch (Exception ignored) {
            }
        }
        return ResponseEntity.ok()
                .contentType(mediaType)
                .contentLength(img.getSize() != null ? img.getSize() : img.getData().length)
                .body(img.getData());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        ApiResponse resp = new ApiResponse("Delete User Successfully!", Map.of("id", id));
        return ResponseEntity.ok(resp);
    }

    private UserResponse toResponse(User user) {
        // hasImage based on repository check
        Boolean hasImage = userImageRepository.existsByUser(user);

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles() == null ? null
                        : user.getRoles().stream().map(r -> r.getName()).collect(java.util.stream.Collectors.toSet()),
                hasImage);
    }
}
