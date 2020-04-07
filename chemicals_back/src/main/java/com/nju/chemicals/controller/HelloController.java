package com.nju.chemicals.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HelloController {

    static Logger logger = LoggerFactory.getLogger(HelloController.class);
    @ResponseBody
    @RequestMapping("/hello")
    public String sayHello() {
//        logger.info("log开始");
        return "hello!";
    }

}
