package com.example.todo.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class GroupResponse {

    private Long id;

    private String name;

    private Integer todoLength;

    public GroupResponse(Long id,String name,Integer todoLength){
        this.id=id;
        this.name=name;
        this.todoLength=todoLength;
    }
    public GroupResponse(Long id,String name){
        this.id=id;
        this.name=name;
    }

}
