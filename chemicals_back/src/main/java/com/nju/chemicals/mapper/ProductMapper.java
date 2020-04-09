package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.Product;
import com.nju.chemicals.entity.ProductWithId;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductMapper {

    Product selectOneByCASAndBatchNumber(String cas, String batchNumber);   // 通过cas号和批号查询一个化学品产品
    List<ProductWithId> selectAll();  // 取得所有化学品产品信息
    Integer insertOneByObj(Product product);    // 插入一条化学品产品信息
    Integer updateOneByObj(ProductWithId productWithId);    // 修改一条化学品产品信息
    Integer deleteOneById(Long id);     // 通过id删除一条化学品产品信息

}
