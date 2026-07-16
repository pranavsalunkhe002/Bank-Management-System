package com.pranav.onlinebankingsystem.controller;


import com.pranav.onlinebankingsystem.entity.User;
import com.pranav.onlinebankingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pranav.onlinebankingsystem.dto.ApiResponse;
import java.security.Principal;
import com.pranav.onlinebankingsystem.dto.ChangePasswordRequest;
import java.security.Principal;
import com.pranav.onlinebankingsystem.dto.UpdateProfileRequest;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ApiResponse<User> registerUser(
            @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return new ApiResponse<>(
                true,
                "User registered successfully",
                savedUser
        );
    }
    @GetMapping("/test")
    public ApiResponse<String> test() {

        return new ApiResponse<>(
                true,
                "User Controller Working",
                null
        );
    }

    @PostMapping("/change-password")
    public ApiResponse<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal principal) {

        userService.changePassword(
                principal.getName(),
                request);

        return new ApiResponse<>(
                true,
                "Password changed successfully",
                null
        );
    }
    @PutMapping("/profile")
    public ApiResponse<User> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Principal principal) {

        User user = userService.updateProfile(
                principal.getName(),
                request);

        return new ApiResponse<>(
                true,
                "Profile updated successfully",
                user
        );
    }
}