package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.UploadedInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
@Scope("prototype")
@Component
public interface UploadedInfoMapper {

    Integer insertOneByObj(UploadedInfo uploadedInfo);

}
