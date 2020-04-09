package com.nju.chemicals.controller;

import com.nju.chemicals.entity.InfoForPolice;
import com.nju.chemicals.entity.InfoForPoliceWithId;
import com.nju.chemicals.service.InfoForPoliceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/police")
public class InfoForPoliceController {

    @Autowired
    private InfoForPoliceService infoForPoliceService;

    @ResponseBody
    @RequestMapping("/getAll")
    public List<InfoForPoliceWithId> getAll() {
        return infoForPoliceService.getAll();
    }

    @ResponseBody
    @RequestMapping("/addOneByObj")
    public String addOneByObj(@RequestBody InfoForPolice infoForPolice) {
        return infoForPoliceService.addOneByObj(infoForPolice);
    }

    // 修改一条报警信息
    @ResponseBody
    @RequestMapping("/editOneById")
    public String editOneById(@RequestBody InfoForPoliceWithId infoForPoliceWithId) {
        return infoForPoliceService.editOneById(infoForPoliceWithId);
    }

    // 通过id删除一条报警信息
    @ResponseBody
    @RequestMapping("/removeOneById/{id}")
    public String removeOneById(@PathVariable Long id) {
        return infoForPoliceService.removeOneById(id);
    }

}
