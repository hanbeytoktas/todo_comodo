package com.example.todo.util;

import com.example.todo.exception.BadRequestException;
import org.springframework.stereotype.Component;

@Component
public class Helper {

    public void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
