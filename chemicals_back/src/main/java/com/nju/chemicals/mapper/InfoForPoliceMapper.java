package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.InfoForPolice;
import com.nju.chemicals.entity.InfoForPoliceWithId;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface InfoForPoliceMapper {

    List<InfoForPoliceWithId> selectAll();
    Integer insertOneByObj(InfoForPolice infoForPolice);
    Integer updateOneByObj(InfoForPoliceWithId infoForPoliceWithId);    // 修改一条报警信息
    Integer deleteOneById(Long id);     // 通过id删除一条报警信息记录

}
