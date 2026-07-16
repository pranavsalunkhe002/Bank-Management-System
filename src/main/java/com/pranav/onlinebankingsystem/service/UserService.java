package com.pranav.onlinebankingsystem.service;


import com.pranav.onlinebankingsystem.entity.User;
import com.pranav.onlinebankingsystem.repository.UserRepository;
import com.pranav.onlinebankingsystem.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pranav.onlinebankingsystem.dto.LoginRequest;
import com.pranav.onlinebankingsystem.dto.LoginResponse;
import com.pranav.onlinebankingsystem.jwt.JwtUtil;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.pranav.onlinebankingsystem.dto.ChangePasswordRequest;
import com.pranav.onlinebankingsystem.dto.UpdateProfileRequest;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    //@Autowired
    //private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    public User registerUser(User user) {

        System.out.println("Password = " + user.getPassword());
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }
    public LoginResponse login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(token);
    }

    public void changePassword(
            String email,
            ChangePasswordRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Current password is incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        userRepository.save(user);
    }
    public User updateProfile(
            String email,
            UpdateProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        return userRepository.save(user);
    }
}