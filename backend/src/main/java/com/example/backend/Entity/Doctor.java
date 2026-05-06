package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "doctors")
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "doctor_name")
    private String name;

    @Column(name = "user_id")
    private Long userId;

    private String contactNo;

    private String specialization;

    // Check karein ki ye Integer hi hai (String nahi)
    private Integer experience;

    private String qualification;
    private String department;

    @Column(name = "availability_status")
    private String availabilityStatus;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "consultation_fee")
    private Double consultationFee;

    @Column(name = "qr_code_url", columnDefinition = "TEXT")
    private String qrCodeUrl;


}