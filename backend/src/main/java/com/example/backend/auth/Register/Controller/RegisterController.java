package com.example.backend.auth.Register.Controller;

import com.example.backend.auth.Register.Entities.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @PostMapping("/user")
    public User registerUser(@RequestBody User user) {

        return user ;
    }
}
