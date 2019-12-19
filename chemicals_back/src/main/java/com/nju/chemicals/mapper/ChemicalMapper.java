package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.Chemical;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ChemicalMapper {

    List<Chemical> selectByCHName(String chName);     // 通过化学品名来模糊查询
    List<Chemical> selectByCAS(String cas);     // 通过CAS编号来模糊查询
    Chemical selectOneByRandom();       // 随机获取一个化学品

}
