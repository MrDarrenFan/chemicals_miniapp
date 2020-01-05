package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductMapper {

    Product selectOneByCASAndBatchNumber(String cas, String batchNumber);   // 通过cas号和批号查询一个化学品产品
    List<Product> selectAll();  // 取得所有化学品产品信息

}
