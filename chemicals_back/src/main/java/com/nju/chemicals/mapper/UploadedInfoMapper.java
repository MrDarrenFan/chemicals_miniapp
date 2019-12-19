package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.UploadedInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UploadedInfoMapper {

    Integer insertOneByObj(UploadedInfo uploadedInfo);

}
