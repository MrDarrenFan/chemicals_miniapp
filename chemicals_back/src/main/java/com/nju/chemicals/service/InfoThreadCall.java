package com.nju.chemicals.service;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.mapper.UploadedInfoMapper;
import com.nju.chemicals.utils.SpringContextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.concurrent.Callable;
@Service
public class InfoThreadCall implements Callable<Integer> {


    private UploadedInfo uploadedInfo;

    public InfoThreadCall(UploadedInfo uploadedInfo){
        this.uploadedInfo=uploadedInfo;
    }

    public InfoThreadCall(){
    }

    @Override
    public Integer call() throws Exception {

            Integer result = -1;
        UploadedInfoMapper uploadedInfoMapper = (UploadedInfoMapper) SpringContextUtil.getBean(UploadedInfoMapper.class);

        try {
                System.out.println("mapper "+uploadedInfoMapper);
                result = uploadedInfoMapper.insertOneByObj(this.uploadedInfo);

            } catch (Exception e) {
                e.printStackTrace();
            }finally {
                return result;
            }

    }
}
