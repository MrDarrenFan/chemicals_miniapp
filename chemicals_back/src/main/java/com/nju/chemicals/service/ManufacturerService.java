package com.nju.chemicals.service;

import com.nju.chemicals.entity.Manufacturer;
import com.nju.chemicals.entity.ManufacturerWithId;
import com.nju.chemicals.mapper.ManufacturerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerService {

    @Autowired
    private ManufacturerMapper manufacturerMapper;

    public List<ManufacturerWithId> getAll() {
        return manufacturerMapper.selectAll();
    }

    // 添加一条生产商信息
    public String addOneByObj(Manufacturer manufacturer) {
        Integer resultNumber = manufacturerMapper.insertOneByObj(manufacturer);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "添加成功，影响行数：" + resultNumber;
        } else {
            resultText = "添加失败";
        }
        return resultText;
    }

    // 修改一条生产商信息
    public String editOneById(ManufacturerWithId manufacturerWithId) {
        Integer resultNumber = manufacturerMapper.updateOneByObj(manufacturerWithId);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "修改成功，影响行数：" + resultNumber;
        } else {
            resultText = "修改失败";
        }
        return resultText;
    }

    // 通过id删除一条生产商信息
    public String removeOneById(Long id) {
        Integer resultNumber = manufacturerMapper.deleteOneById(id);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "删除成功，影响行数：" + resultNumber;
        } else {
            resultText = "删除失败";
        }
        return resultText;
    }

}
