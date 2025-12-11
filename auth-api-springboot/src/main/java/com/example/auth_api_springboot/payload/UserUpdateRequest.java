package com.example.auth_api_springboot.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    // Optional fields; validate format when present
    private String name;

    private String username;

    @Email(message = "Email is invalid")
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
