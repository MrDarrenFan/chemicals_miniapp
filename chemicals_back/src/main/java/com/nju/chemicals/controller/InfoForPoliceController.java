package com.nju.chemicals.controller;

import com.nju.chemicals.entity.InfoForPolice;
import com.nju.chemicals.service.InfoForPoliceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/police")
public class InfoForPoliceController {

    @Autowired
    private InfoForPoliceService infoForPoliceService;

    @ResponseBody
    @RequestMapping("/addOneByObj")
    public Boolean addOneByObj(@RequestBody InfoForPolice infoForPolice) {
        return infoForPoliceService.addOneByObj(infoForPolice);
    }

}
