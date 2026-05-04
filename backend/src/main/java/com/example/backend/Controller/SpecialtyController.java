package com.example.backend.Controller;

import com.example.backend.Entity.Specialty;
import com.example.backend.Service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Angular access ke liye
public class SpecialtyController {

    @Autowired
    private SpecialtyService specialtyService;

    @GetMapping("/specialties")
    public List<Specialty> getAllSpecialties() {
        return specialtyService.findAll();
    }
}
