package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.Chemical;
import com.nju.chemicals.entity.ChemicalWithId;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ChemicalMapper {

    List<Chemical> selectByCHName(String chName);     // 通过化学品名来模糊查询
    List<Chemical> selectByCAS(String cas);     // 通过CAS编号来模糊查询
    Chemical selectOneByRandom();       // 随机获取一个化学品
    List<ChemicalWithId> selectAll();
    Integer insertOneByObj(Chemical chemical);   // 插入一条化学品信息
    Integer updateOneByObj(ChemicalWithId chemicalWithId);    // 修改一条化学品信息
    Integer deleteOneById(Long id);     // 通过id删除一条化学品记录

}
