package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.InfoForPolice;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface InfoForPoliceMapper {

    Integer insertOneByObj(InfoForPolice infoForPolice);

}
