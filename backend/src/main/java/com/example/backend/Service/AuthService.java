package com.example.backend.Service;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder; // Yeh bohot zaroori hai
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder; // Registration ke liye zaroori

    // 1. Naya Registration Method (Login fix karne ke liye)
    public void registerUser(User user) {
        // Password ko encrypt (hash) karna
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        user.setStatus("Active");
        userRepository.save(user);
        System.out.println("User registered successfully with encrypted password!");
    }

    // 2. Forget Password Method (Email bhejne ke liye)
    @Transactional
    public void sendForgotPasswordEmail(String email) {
        System.out.println("Step 1: Email received -> " + email);
        User user = userRepository.findByEmail(email);

        if (user == null) {
            System.out.println("Step 2: User NOT found in DB!");
            return;
        }

        System.out.println("Step 3: User found! ID is: " + user.getUserId());
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        userRepository.save(user);
        System.out.println("Step 4: Token saved in DB.");

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password Reset Link");
            message.setText("Click here to reset your password: http://localhost:4200/reset-password?token=" + token);
            mailSender.send(message);
            System.out.println("Step 5: EMAIL SENT SUCCESSFULLY!");
        } catch (Exception e) {
            System.out.println("Step 5 ERROR: Email failed -> " + e.getMessage());
            e.printStackTrace();
        }
    }
    // Ise AuthService mein niche add kar dein
    public void updatePassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null); // Token clear karein taaki link dobara use na ho
            userRepository.save(user);
        }
    }
}