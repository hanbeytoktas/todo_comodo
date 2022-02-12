package com.example.todo.repository;

import com.example.todo.model.Group;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.payload.GroupResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    Optional<Group> findById(Long todoId);

    @Query("select new com.example.todo.payload.GroupResponse(gh.id,gh.name,gh.todos.size) from Group gh where gh.user.id = :userId")
    Page<GroupResponse> findAllByUser(@Param("userId") long userId, Pageable pageable);

    @Query("select new com.example.todo.payload.GroupResponse(gh.id,gh.name) from Group gh where gh.user.id = :userId")
    List<GroupResponse> findAllByUser(@Param("userId") long userId);
}
