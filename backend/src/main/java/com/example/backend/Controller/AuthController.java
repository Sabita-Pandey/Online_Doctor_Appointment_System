package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
// "*" hatakar "allowedOriginPatterns" use karein
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // ... aapka code


    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User user = userRepo.findByEmail(loginUser.getEmail());
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // ERD ke mutabiq default values set karna
        System.out.println(user);
        user.setRegistrationDate(LocalDate.now().toString()); // Registration date aaj ki hogi [cite: 10]
        user.setStatus("Active"); // Default status Active rahega [cite: 11]

        // Database mein save karna
        User savedUser = userRepo.save(user);
        System.out.println(savedUser);
        return ResponseEntity.ok(savedUser);
    }
}