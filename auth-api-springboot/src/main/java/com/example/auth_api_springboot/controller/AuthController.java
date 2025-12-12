package com.example.auth_api_springboot.controller;

import com.example.auth_api_springboot.payload.ApiResponse;
import com.example.auth_api_springboot.payload.JWTAuthResponse;
import com.example.auth_api_springboot.payload.LoginDto;
import com.example.auth_api_springboot.payload.RegisterDto;
import com.example.auth_api_springboot.payload.UserResponse;
import com.example.auth_api_springboot.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = { "/login" })
    public ResponseEntity<JWTAuthResponse> login(@Valid @RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping(value = { "/register" })
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        var user = authService.register(registerDto);
        UserResponse data = new UserResponse(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles() == null ? null
                        : user.getRoles().stream().map(r -> r.getName()).collect(java.util.stream.Collectors.toSet()),
                Boolean.FALSE);
        ApiResponse api = new ApiResponse("Create User Success!", data);
        return new ResponseEntity<>(api, HttpStatus.CREATED);
    }
}
