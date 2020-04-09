package com.nju.chemicals.controller;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.entity.UploadedInfoWithId;
import com.nju.chemicals.service.UploadedInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/upload")
public class UploadedInfoController {

    @Autowired
    private UploadedInfoService uploadedInfoService;

    // 取得所有上传信息
    @ResponseBody
    @RequestMapping("/getAll")
    public List<UploadedInfoWithId> getAll() {
        return uploadedInfoService.getAll();
    }

    // 添加一条上传信息
    @ResponseBody
    @RequestMapping("/addOneByObj")
    public Boolean addOneByObj(@RequestBody UploadedInfo uploadedInfo) {
        return uploadedInfoService.addOneByObj(uploadedInfo);
    }

    // 修改一条上传信息
    @ResponseBody
    @RequestMapping("/editOneById")
    public String editOneById(@RequestBody UploadedInfoWithId uploadedInfoWithId) {
        return uploadedInfoService.editOneById(uploadedInfoWithId);
    }

    // 通过id删除一条上传信息
    @ResponseBody
    @RequestMapping("/removeOneById/{id}")
    public String removeOneById(@PathVariable Long id) {
        return uploadedInfoService.removeOneById(id);
    }

}
