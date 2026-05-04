package com.example.backend.Repository;

import com.example.backend.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Yahan "Patient" aapki Entity ka naam hai aur "Long" Primary Key ka type
}
