package com.example.auth_api_springboot.config;


import com.example.auth_api_springboot.entity.Role;
import com.example.auth_api_springboot.entity.User;
import com.example.auth_api_springboot.repository.RoleRepository;
import com.example.auth_api_springboot.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        ensureRole("ROLE_USER");
        ensureRole("ROLE_ADMIN");

        final String adminUsername = "admin";
        final String adminEmail = "admin@gmail.com";
        final String adminPassword = "Admin@123"; // change in production

        boolean adminExists = userRepository.existsByUsername(adminUsername)
                || userRepository.existsByEmail(adminEmail);

        if (!adminExists) {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new IllegalStateException("ROLE_ADMIN missing"));
            Role userRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new IllegalStateException("ROLE_USER missing"));

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            roles.add(userRole); // optional

            User admin = new User();
            admin.setName("Administrator");
            admin.setUsername(adminUsername);
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRoles(roles);

            userRepository.save(admin);
            System.out.println("Seeded default admin: " + adminUsername);
        }
    }

    private void ensureRole(String roleName) {
        roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role r = new Role();
                    r.setName(roleName);
                    return roleRepository.save(r);
                });
    }
}
