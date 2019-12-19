package com.nju.chemicals.service;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.mapper.UploadedInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadedInfoService {

    @Autowired
    private UploadedInfoMapper uploadedInfoMapper;

    public Boolean addOneByObj(UploadedInfo uploadedInfo) {
        Integer result = uploadedInfoMapper.insertOneByObj(uploadedInfo);
        if (result.equals(null)) {      // 结果为空代表插入失败
            return false;
        } else {
            return true;
        }
    }

}
