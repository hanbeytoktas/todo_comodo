package com.example.todo.repository;

import com.example.todo.model.Group;
import com.example.todo.model.Todo;
import com.example.todo.payload.TodoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    Optional<Todo> findById(Long todoId);

    @Query("select new com.example.todo.payload.TodoResponse(t.id,t.name,t.description,t.user.name,t.group.id,t.group.name,t.done,t.dueDate,t.priority) from Todo t where t.user.id=:userId and t.done=:done")
    Page<TodoResponse> findAllByUser(@Param("userId") Long userId,@Param("done") Boolean done, Pageable pageable);


    @Transactional
    @Modifying
    @Query("delete from Todo t where t.group.id=:groupId")
    void deleteByGroup(@Param("groupId") Long groupId);

}
