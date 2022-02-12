package com.example.todo.service;

import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.model.*;
import com.example.todo.payload.*;
import com.example.todo.repository.GroupRepository;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import com.example.todo.security.UserPrincipal;
import com.example.todo.util.Helper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


/**
 * @author hanbey
 * @apiNote Service of Todo Management
 */


@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private Helper helper;

    /**
     * @param currentUser data of active user
     * @param request     query request of Todo
     * @return return of PagedResponse<Todo>
     */
    public PagedResponse<TodoResponse> getAllTodosWitPage(UserPrincipal currentUser, QueryRequest request) throws JsonProcessingException {
        helper.validatePageNumberAndSize(request.getPage(), request.getLimit());
        Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.Direction.valueOf(request.getSort().get(0).getDirection().toUpperCase()), request.getSort().get(0).getField());

        Map<String, Object> result = new ObjectMapper().readValue(request.getSearch(), HashMap.class);
        Page<TodoResponse> todos = todoRepository.findAllByUser(currentUser.getId(), (Boolean) result.get("done"), pageable);

        if (todos.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), todos.getNumber(),
                    todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
        }
        return new PagedResponse<>(todos.toList(), todos.getNumber(),
                todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
    }

    /**
     * @param currentUser data of active user
     * @param todoRequest created or updated Todo data
     * @return if there is not exception then return success
     */
    @Transactional
    public Todo createTodo(TodoRequest todoRequest, UserPrincipal currentUser) {
        Todo todo = new Todo();
        if (!ObjectUtils.isEmpty(todoRequest.getId())) {
            todo = todoRepository.getById(todoRequest.getId());
        }
        todo.setDescription(todoRequest.getDescription());
        todo.setName(todoRequest.getName());
        todo.setPriority(Priority.valueOf(todoRequest.getPriority()));
        todo.setDueDate(todoRequest.getDueDate());
        todo.setGroup(groupRepository.getById(todoRequest.getGroupId()));
        todo.setUser(userRepository.getById(currentUser.getId()));
        return todoRepository.save(todo);
    }

    /**
     * @param todoId id of Todo
     * Set Todo done flag true or false
     */
    @Transactional
    public void setDone(Long todoId, boolean val) {
        Todo todo = todoRepository.getById(todoId);
        todo.setDone(val);
        todoRepository.save(todo);
    }

    public Todo getTodoById(Long todoId) {
        return todoRepository.findById(todoId).orElseThrow(
                () -> new ResourceNotFoundException("Todo", "id", todoId));
    }

    /**
     * @param groupId id of Group
     * This function delete of all todo data by gropId
     */
    @Transactional
    public void deleteAllByGruop(Long groupId) {
        todoRepository.deleteByGroup(groupId);
    }


    /**
     * @param id id of Todo
     * This function delete todo by id
     */
    @Transactional
    public void deleteById(Long id) {
        todoRepository.deleteById(id);
    }


    /**
     * @param request request object of Todo id and Priority
     * This function change priority of Todo
     */
    @Transactional
    public void changePriority(ChangePriorityRequest request) {
        Todo todo = todoRepository.getById(request.getId());
        todo.setPriority(Priority.valueOf(request.getPriority()));
        todoRepository.save(todo);
    }
}
