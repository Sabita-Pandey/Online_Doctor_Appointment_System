package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_id")
    private Long patientId;

    private String patientName;
    private String email;
    private String doctorName;

    @Column(name = "appointment_date")
    private String appointmentDate;
    private String timeSlot;
    private String locationType;
    private String allergies;
    private String paymentMethod;
    private Double feesAmount;
    private Long doctorId;
    private String message;

    @Column(name = "status")
    private String status = "Pending";

    @Column(name = "booking_date_time")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // standard ISO format
    private LocalDateTime bookingDateTime;


    @PrePersist
    protected void onCreate() {
        this.bookingDateTime = LocalDateTime.now();
    }


}