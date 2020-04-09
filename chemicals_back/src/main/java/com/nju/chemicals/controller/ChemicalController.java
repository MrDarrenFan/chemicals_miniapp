package com.nju.chemicals.controller;

import com.nju.chemicals.entity.Chemical;
import com.nju.chemicals.entity.ChemicalWithId;
import com.nju.chemicals.service.ChemicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @ResponseBody
    @RequestMapping("/getAll")
    public List<ChemicalWithId> getAll() {
        return chemicalService.getAll();
    }

    // 添加一条化学品信息
    @ResponseBody
    @RequestMapping("/addOneByObj")
    public String addOneByObj(@RequestBody Chemical chemical) {
        return chemicalService.addOneById(chemical);
    }

    // 修改一条化学品信息
    @ResponseBody
    @RequestMapping("/editOneById")
    public String editOneById(@RequestBody ChemicalWithId chemicalWithId) {
        return chemicalService.editOneById(chemicalWithId);
    }

    // 通过id删除一条化学品信息
    @ResponseBody
    @RequestMapping("/removeOneById/{id}")
    public String removeOneById(@PathVariable Long id) {
        return chemicalService.removeOneById(id);
    }

}
