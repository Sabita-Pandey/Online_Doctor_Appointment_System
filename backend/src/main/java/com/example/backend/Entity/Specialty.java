package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Agar Lombok use kar rahe hain
public class Specialty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String icon; // Icon ka naam ya path store karne ke liye
}
