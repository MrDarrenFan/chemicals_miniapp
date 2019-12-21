package com.nju.chemicals.controller;

import com.nju.chemicals.entity.Chemical;
import com.nju.chemicals.service.ChemicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/chemicals")
public class ChemicalController {

    @Autowired
    private ChemicalService chemicalService;

    // 通过化学品名来模糊查询
    @ResponseBody
    @RequestMapping("/getByCHName/{chName}")
    public List<Chemical> getByCHName(@PathVariable("chName") String chName) {
        return chemicalService.getByCHName(chName);
    }

    // 通过CAS编号来模糊查询
    @ResponseBody
    @RequestMapping("/getByCAS/{cas}")
    public List<Chemical> getByCAS(@PathVariable("cas") String cas) {
        Pattern pattern = Pattern.compile("[0-9]*");
        if (pattern.matcher(cas).matches()) {   // 包含数字才搜索
            return chemicalService.getByCAS(cas);
        } else {
            return null;
        }
    }

    // 随机获取一个化学品信息
    @ResponseBody
    @RequestMapping("/getOneByRandom/{chName}")
    public Chemical getOneByRandom(@PathVariable String chName) {
        return chemicalService.getOneByRandom(chName);
    }

    // 随机获取三个化学品信息
    @ResponseBody
    @RequestMapping("/getThreeByRandom/{nameStr}")
    public List<Chemical> getThreeByRandom(@PathVariable String nameStr) {
        return chemicalService.getThreeByRandom(nameStr);
    }

}
