package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.entity.UploadedInfoWithId;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
@Scope("prototype")
@Component
public interface UploadedInfoMapper {

    List<UploadedInfoWithId> selectAll();   // 取得所有上传信息记录
    Integer insertOneByObj(UploadedInfo uploadedInfo);      // 插入一条上传信息
    Integer updateOneByObj(UploadedInfoWithId uploadedInfoWithId);    // 修改一条上传信息
    Integer deleteOneById(Long id);     // 通过id删除一条上传信息

}
