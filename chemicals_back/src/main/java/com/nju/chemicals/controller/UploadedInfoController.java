package com.nju.chemicals.controller;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.service.UploadedInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/upload")
public class UploadedInfoController {

    @Autowired
    private UploadedInfoService uploadedInfoService;

    @ResponseBody
    @RequestMapping("/addOneByObj")
    public Boolean addOneByObj(@RequestBody UploadedInfo uploadedInfo) {
        return uploadedInfoService.addOneByObj(uploadedInfo);
    }

}
