package com.example.todo.controller;

import com.example.todo.payload.*;
import com.example.todo.security.CurrentUser;
import com.example.todo.security.UserPrincipal;
import com.example.todo.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


/**
 * @author hanbey
 * @apiNote Controller of Group Management
 * */

@RestController
@RequestMapping("/api/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    /**
     * @param currentUser data of active user
     * @param request query request of Group
     * @return return of PagedResponse<Group>
     * */
    @PostMapping("/query")
    public PagedResponse<GroupResponse> getAllGroups(@CurrentUser UserPrincipal currentUser,@RequestBody QueryRequest request) {
        return groupService.getAllGroupsWitPage(currentUser,request);
    }


    /**
     * @param currentUser data of active user
     * @return return of List<Group>
     * */
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<GroupResponse> getAllGroups(@CurrentUser UserPrincipal currentUser) {
        return groupService.getAllGroup(currentUser);
    }


    /**
     * @param currentUser data of active user
     * @param groupRequest created or updated Group data
     * @return if there is not exception then return success
     * */
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> saveGroup(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody GroupRequest groupRequest) {
        groupService.saveGroup(currentUser,groupRequest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Group Created Successfully"));
    }


    /**
     * @param id id of Group
     * @return if there is not exception then return success
     * */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteGrup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.ok().body(new ApiResponse(true, "Group Created Successfully"));
    }

}
