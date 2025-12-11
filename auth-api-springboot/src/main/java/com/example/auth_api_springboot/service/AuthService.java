package com.example.auth_api_springboot.service;

import com.example.auth_api_springboot.entity.User;
import com.example.auth_api_springboot.payload.LoginDto;
import com.example.auth_api_springboot.payload.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);

    User register(RegisterDto registerDto);
}
