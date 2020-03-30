package com.nju.chemicals.service;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.mapper.UploadedInfoMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@Configuration
public class InfoFutureTask {


    private int state;
    private UploadedInfo uploadedInfo;

    public InfoFutureTask(UploadedInfo uploadedInfo) {
        this.uploadedInfo = uploadedInfo;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public UploadedInfo getUploadedInfo() {
        return uploadedInfo;
    }

    public void setUploadedInfo(UploadedInfo uploadedInfo) {
        this.uploadedInfo = uploadedInfo;
    }
}
