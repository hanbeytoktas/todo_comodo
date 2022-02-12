package com.example.todo.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QueryRequest {

    private Integer limit;
    private Integer page;
    private String search;
    private List<QuerySortRequest> sort;

}



