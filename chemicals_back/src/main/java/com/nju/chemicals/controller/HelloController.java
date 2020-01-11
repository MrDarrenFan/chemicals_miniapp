package com.nju.chemicals.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HelloController {

    @ResponseBody
    @RequestMapping("/hello")
    public String sayHello() {
        return "hello world!";
    }

}
