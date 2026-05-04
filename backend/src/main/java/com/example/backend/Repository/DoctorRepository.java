package com.example.backend.Repository;

import com.example.backend.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Yahan kuch bhi Hindi mein mat likhna bina // lagaye
}