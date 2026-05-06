package com.example.backend.Controller;

import com.example.backend.Entity.Doctor;
import com.example.backend.Repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
// REMOVE THIS: @CrossOrigin(originPatterns = "http://localhost:4200", allowCredentials = "true")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @PostMapping("/save")
    public Doctor saveDoctor(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}