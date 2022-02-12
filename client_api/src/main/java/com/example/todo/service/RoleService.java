package com.example.todo.service;

import com.example.todo.model.Role;
import com.example.todo.model.RoleName;
import com.example.todo.model.User;
import com.example.todo.payload.UserSummary;
import com.example.todo.repository.RoleRepository;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author hanbey
 * @apiNote Controller of Role Management
 * */

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;


    /**
     * @param role Role data
     * */
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    /**
     * @param roleName data of RoleName
     * @return if role exist then true else false
     * */
    public boolean roleExist(RoleName roleName) {
        return roleRepository.findByName(roleName).isEmpty();
    }
}