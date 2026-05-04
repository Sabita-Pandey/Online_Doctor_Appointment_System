package com.example.backend.Controller;

import com.example.backend.Entity.Doctor; // 2. Model import

import com.example.backend.Repository.DoctorRepository; // 3. Repo import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*") // Sabse simple aur best tarika testing ke liye
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


