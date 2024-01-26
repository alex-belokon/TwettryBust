package com.socialnetwork.socialnetworkapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

//@ControllerAdvice говорит Spring, что этот класс предназначен для обработки исключений в контроллерах.
//@ExceptionHandler(Exception.class) указывает метод handleException, чтобы обрабатывать исключения типа Exception.
//@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) задает HTTP-статус 500 для ошибок сервера.
//ModelAndView используется для возвращения модели и имени представления (в данном случае, "error").
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ModelAndView handleException(Exception e) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("error");
        modelAndView.addObject("error", e.getMessage());
        return modelAndView;
    }
}