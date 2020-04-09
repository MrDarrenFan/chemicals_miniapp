package com.nju.chemicals.controller;

import com.nju.chemicals.entity.Manufacturer;
import com.nju.chemicals.entity.ManufacturerWithId;
import com.nju.chemicals.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manufacturer")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @ResponseBody
    @RequestMapping("/getAll")
    public List<ManufacturerWithId> getAll() {
        return manufacturerService.getAll();
    }

    @ResponseBody
    @RequestMapping("/addOneByObj")
    public String addOneByObj(@RequestBody Manufacturer manufacturer) {
        return manufacturerService.addOneByObj(manufacturer);
    }

    // 修改一条生产商信息
    @ResponseBody
    @RequestMapping("/editOneById")
    public String editOneById(@RequestBody ManufacturerWithId manufacturerWithId) {
        return manufacturerService.editOneById(manufacturerWithId);
    }

    // 通过id删除一条生产商信息
    @ResponseBody
    @RequestMapping("/removeOneById/{id}")
    public String removeOneById(@PathVariable Long id) {
        return manufacturerService.removeOneById(id);
    }

}
