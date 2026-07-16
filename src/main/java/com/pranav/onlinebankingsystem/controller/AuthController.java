package com.pranav.onlinebankingsystem.controller;

import com.pranav.onlinebankingsystem.dto.LoginRequest;
import com.pranav.onlinebankingsystem.dto.LoginResponse;
import com.pranav.onlinebankingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pranav.onlinebankingsystem.dto.ApiResponse;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @RequestBody LoginRequest request) {

        LoginResponse response =
                userService.login(request);

        return new ApiResponse<>(
                true,
                "Login successful",
                response
        );
    }
}