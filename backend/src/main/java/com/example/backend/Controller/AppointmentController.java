package com.example.backend.Controller; // Aapka package name

import com.example.backend.Entity.Appointment;
import com.example.backend.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointments") // Yeh path Angular service se match hona chahiye
@CrossOrigin(origins = "*", allowedHeaders = "*") // CORS error se bachne ke liye zaroori hai
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // 1. Purana method (Booking save karne ke liye)
    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        System.out.println("Backend received data for: " + appointment.getPatientName());

        // 1. Pehle ye line likhiye check karne ke liye
        System.out.println("Calling Repository Save...");

        // 2. Save method call kijiye
        Appointment saved = appointmentService.saveAppointment(appointment);

        // 3. Check kijiye ki database ne ID diya ya nahi
        System.out.println("Saved ID from Database: " + saved.getId());

        return saved;
    }

    // 2. NAYA METHOD (Yahan likhein): Booked data laane ke liye
    @GetMapping("/booked/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentService.findByPatientId(patientId);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        appointmentService.updateStatus(id, status);
        // String ke bajaye JSON format mein bhejein
        return ResponseEntity.ok().body("{\"message\": \"Updated Successfully\"}");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointmentById(id);
            return ResponseEntity.ok("Appointment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting record");
        }
    }
}