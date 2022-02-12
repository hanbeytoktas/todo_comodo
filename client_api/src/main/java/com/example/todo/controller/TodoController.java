package com.example.todo.controller;

import com.example.todo.model.*;
import com.example.todo.payload.*;
import com.example.todo.security.CurrentUser;
import com.example.todo.security.UserPrincipal;
import com.example.todo.service.TodoService;
import com.example.todo.util.AppConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


/**
 * @author hanbey
 * @apiNote Controller of Todo Management
 */


@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;


    /**
     * @param currentUser data of active user
     * @param request     query request of Todo
     * @return return of PagedResponse<Todo>
     */
    @PostMapping("/query")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<TodoResponse> getAllTodosWithPage(@CurrentUser UserPrincipal currentUser,
                                                           @Valid @RequestBody QueryRequest request) throws JsonProcessingException {
        return todoService.getAllTodosWitPage(currentUser, request);
    }

    /**
     * @param currentUser data of active user
     * @param todoRequest created or updated Todo data
     * @return if there is not exception then return success
     */
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createTodo(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody TodoRequest todoRequest) {
        todoService.createTodo(todoRequest, currentUser);
        return ResponseEntity.ok().body(new ApiResponse(true, "Todo Created Successfully"));
    }

    /**
     * @param todoId id of Todo
     * @return if data is exist then return Todo data
     */
    @GetMapping("/{todoId}")
    public Todo getTodoById(@PathVariable Long todoId) {
        return todoService.getTodoById(todoId);
    }


    /**
     * @param todoId id of Todo
     * @return if there is not exception then return success
     */
    @GetMapping("/{todoId}/done")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> setDone(@PathVariable Long todoId) {
        todoService.setDone(todoId, true);
        return ResponseEntity.ok().body(new ApiResponse(true, "Todo done process successfully"));

    }

    /**
     * @param todoId id of Todo
     * @return if there is not exception then return success
     */
    @GetMapping("/{todoId}/undone")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> setUnDone(@PathVariable Long todoId) {
        todoService.setDone(todoId, false);
        return ResponseEntity.ok().body(new ApiResponse(true, "Todo undone process successfully"));
    }

    /**
     * @return return of priorities String list
     */
    @GetMapping("/priorities")
    @PreAuthorize("hasRole('USER')")
    public List<String> getPriorities() {
        return Stream.of(Priority.values())
                .map(Priority::name)
                .collect(Collectors.toList());
    }

    /**
     * @param id id of Todo
     * @return if there is not exception then return success
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        todoService.deleteById(id);
        return ResponseEntity.ok().body(new ApiResponse(true, "Todo Delete Successfully"));
    }

    /**
     * @param currentUser data of active user
     * @param request request object of Todo id and Priority
     * @return if there is not exception then return success
     */
    @PostMapping("/changePriority")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePriority(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody ChangePriorityRequest request) {
        todoService.changePriority(request);
        return ResponseEntity.ok().body(new ApiResponse(true, "Todo priority change Successfully"));

    }
}
