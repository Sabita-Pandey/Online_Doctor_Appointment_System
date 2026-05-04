package com.example.backend.Controller;

import com.example.backend.Entity.Patient;
import com.example.backend.Entity.Patient;
import com.example.backend.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/save")
    public Patient savePatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }
}
