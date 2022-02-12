package com.example.todo.payload;

import com.example.todo.model.Priority;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Data
public class TodoResponse {

    private Long id;

    private String name;

    private String description;

    private String userName;

    private GroupResponse group;

    private boolean done;

    private Date dueDate;

    private Priority priority;

    public TodoResponse(Long id,String name,String description,String userName,Long groupId,String groupName,Boolean done,Date dueDate,Priority priority){
        this.id=id;
        this.name=name;
        this.description=description;
        this.userName=userName;
        this.group=new GroupResponse();
        this.group.setId(groupId);
        this.group.setName(groupName);
        this.done=done;
        this.dueDate=dueDate;
        this.priority=priority;
    }


}
