package com.nju.chemicals.service;

import com.nju.chemicals.entity.Chemical;
import com.nju.chemicals.entity.ChemicalWithId;
import com.nju.chemicals.mapper.ChemicalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChemicalService {

    @Autowired
    private ChemicalMapper chemicalMapper;

    // 通过化学品名来模糊查询
    public List<Chemical> getByCHName(String chName) {
        return chemicalMapper.selectByCHName(chName);
    }

    // 通过CAS编号来模糊查询
    public List<Chemical> getByCAS(String cas) {
        return chemicalMapper.selectByCAS(cas);
    }

    // 随机获取一个化学品信息
    public Chemical getOneByRandom(String chName) {
        Chemical chemical = chemicalMapper.selectOneByRandom();
        while (chemical.getChName().equals(chName)) {
            chemical = chemicalMapper.selectOneByRandom();
        }
        return chemical;
    }

    // 随机获取三个化学品
    public List<Chemical> getThreeByRandom(String nameStr) {
        String[] temp = nameStr.split(" ");
        List<String> nameOfLastThree = new ArrayList<>();
        List<String> nameInResult = new ArrayList<>();
        List<Chemical> result = new ArrayList<>();
        for (String name : temp) {
            nameOfLastThree.add(name.trim());
        }
        while(result.size() < 3) {
            Chemical chemical = chemicalMapper.selectOneByRandom();
            if (!nameOfLastThree.contains(chemical.getChName()) && !nameInResult.contains(chemical.getChName())) {
                nameInResult.add(chemical.getChName());
                result.add(chemical);
            }
        }
        return result;
    }

    public List<ChemicalWithId> getAll() {
        return chemicalMapper.selectAll();
    }

    // 添加一条化学品信息
    public String addOneById(Chemical chemical) {
        Integer resultNumber = chemicalMapper.insertOneByObj(chemical);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "添加成功，影响行数：" + resultNumber;
        } else {
            resultText = "添加失败";
        }
        return resultText;
    }

    // 修改一条化学品信息
    public String editOneById(ChemicalWithId chemicalWithId) {
        Integer resultNumber = chemicalMapper.updateOneByObj(chemicalWithId);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "修改成功，影响行数：" + resultNumber;
        } else {
            resultText = "修改失败";
        }
        return resultText;
    }

    // 通过id删除一条化学品信息
    public String removeOneById(Long id) {
        Integer resultNumber = chemicalMapper.deleteOneById(id);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "删除成功，影响行数：" + resultNumber;
        } else {
            resultText = "删除失败";
        }
        return resultText;
    }

}
