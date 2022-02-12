package com.example.todo.service;

import com.example.todo.model.User;
import com.example.todo.payload.UserSummary;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author hanbey
 * @apiNote Service of User Management
 */

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    /**
     * @param id Id of UserId
     * @return of {@link UserSummary}
     * */
    public UserSummary getUserInfo(Long id){
        User data= userRepository.getById(id);
        return new UserSummary(data.getId(),data.getName(),data.getUsername(), data.getEmail());
    }

    public User getById(Long id){
        return userRepository.getById(id);
    }

}
