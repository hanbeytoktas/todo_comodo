package com.example.todo;

import com.example.todo.model.Role;
import com.example.todo.model.RoleName;
import com.example.todo.repository.RoleRepository;
import com.example.todo.service.RoleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = {
        TodoApplication.class,
        Jsr310JpaConverters.class
})
public class TodoApplication {

    RoleService roleService;

    @Autowired
    public TodoApplication(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Bean
    public void initRoles() {
        if (roleService.roleExist(RoleName.ROLE_USER)) {
            roleService.saveRole(new Role(RoleName.ROLE_USER));
        }
        if (roleService.roleExist(RoleName.ROLE_ADMIN)) {
            roleService.saveRole(new Role(RoleName.ROLE_ADMIN));
        }
    }
}
