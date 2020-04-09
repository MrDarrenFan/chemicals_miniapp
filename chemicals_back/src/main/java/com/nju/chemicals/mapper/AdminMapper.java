package com.nju.chemicals.mapper;

import com.nju.chemicals.entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AdminMapper {

    Admin selectOneByUsername(String username);     // 查询一条管理员信息
    Integer insertOneByObj(Admin admin);    // 插入一条管理员信息
    Integer updateOneByObj(Admin admin);    // 通过id修改一条管理员的信息
    Integer deleteOneById(Long id);     // 通过id删除一条管理员信息

}
