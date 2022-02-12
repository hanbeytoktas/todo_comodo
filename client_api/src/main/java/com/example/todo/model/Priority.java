package com.example.todo.model;

public enum Priority {
    HIGHEST("HIGHEST"),
    HIGH("HIGH"),
    MEDIUM("MEDIUM"),
    LOW("LOW"),
    LOWEST("LOWEST");

    public final String label;

    public String getLabel(){
        return label;
    }

    Priority(String label) {
        this.label = label;
    }

}

