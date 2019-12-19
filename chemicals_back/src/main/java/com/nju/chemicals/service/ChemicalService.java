package com.nju.chemicals.service;

import com.nju.chemicals.entity.Chemical;
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
    public List<Chemical> getThreeByRandom(List<String> nameOfLastThree) {
        List<String> nameInRes = new ArrayList<>();
        List<Chemical> result = new ArrayList<>();
        while(result.size() < 3) {
            Chemical chemical = chemicalMapper.selectOneByRandom();
            if (!nameOfLastThree.contains(chemical.getChName()) && !nameInRes.contains(chemical.getChName())) {
                nameInRes.add(chemical.getChName());
                result.add(chemical);
            }
        }
        return result;
    }

}
