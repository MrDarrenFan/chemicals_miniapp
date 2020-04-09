package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.Manufacturer;
import com.nju.chemicals.entity.ManufacturerWithId;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ManufacturerMapper {

    List<ManufacturerWithId> selectAll();   // 取得所有生产商信息
    Integer insertOneByObj(Manufacturer manufacturer);      // 插入一条生产商信息
    Integer updateOneByObj(ManufacturerWithId manufacturerWithId);    // 修改一条生产商信息
    Integer deleteOneById(Long id);     // 通过id删除一条生产商信息

}
