package com.nju.chemicals.service;

import com.nju.chemicals.entity.InfoForPolice;
import com.nju.chemicals.entity.InfoForPoliceWithId;
import com.nju.chemicals.mapper.InfoForPoliceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfoForPoliceService {

    @Autowired
    private InfoForPoliceMapper infoForPoliceMapper;

    public List<InfoForPoliceWithId> getAll() {
        return infoForPoliceMapper.selectAll();
    }

    // 添加一条报警信息
    public String addOneByObj(InfoForPolice infoForPolice) {
        Integer resultNumber = infoForPoliceMapper.insertOneByObj(infoForPolice);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "添加成功，影响行数：" + resultNumber;
        } else {
            resultText = "添加失败";
        }
        return resultText;
    }

    // 修改一条报警信息
    public String editOneById(InfoForPoliceWithId infoForPoliceWithId) {
        Integer resultNumber = infoForPoliceMapper.updateOneByObj(infoForPoliceWithId);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "修改成功，影响行数：" + resultNumber;
        } else {
            resultText = "修改失败";
        }
        return resultText;
    }

    // 通过id删除一条报警信息
    public String removeOneById(Long id) {
        Integer resultNumber = infoForPoliceMapper.deleteOneById(id);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "删除成功，影响行数：" + resultNumber;
        } else {
            resultText = "删除失败";
        }
        return resultText;
    }

}
