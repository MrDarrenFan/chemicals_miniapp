package com.nju.chemicals.service;

import com.nju.chemicals.mapper.UploadedInfoMapper;
import com.nju.chemicals.utils.SpringContextUtil;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;



public class InfoThread implements Runnable {


    private InfoFutureTask task;

    public InfoThread(InfoFutureTask task){
        this.task=task;
    }

    @Override
    public void run() {
        UploadedInfoMapper uploadedInfoMapper = (UploadedInfoMapper) SpringContextUtil.getBean(UploadedInfoMapper.class);
        try{
            Integer result = uploadedInfoMapper.insertOneByObj(task.getUploadedInfo());
            task.setState(result);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}
