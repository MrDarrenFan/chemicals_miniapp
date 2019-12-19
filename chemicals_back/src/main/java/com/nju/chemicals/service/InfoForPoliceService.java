package com.nju.chemicals.service;

import com.nju.chemicals.entity.InfoForPolice;
import com.nju.chemicals.mapper.InfoForPoliceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InfoForPoliceService {

    @Autowired
    private InfoForPoliceMapper infoForPoliceMapper;

    public Boolean addOneByObj(InfoForPolice infoForPolice) {
        Integer result = infoForPoliceMapper.insertOneByObj(infoForPolice);
        if (result.equals(null)) {      // 结果为空代表插入失败
            return false;
        } else {
            return true;
        }
    }

}
