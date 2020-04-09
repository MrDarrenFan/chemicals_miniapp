package com.nju.chemicals.service;

import com.nju.chemicals.entity.Admin;
import com.nju.chemicals.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminMapper adminMapper;

    // 登录
    public Boolean login(String username, String password) {
        Admin thisAdmin = adminMapper.selectOneByUsername(username);
        if (thisAdmin.equals(null)) {   // 用户名不存在
            return false;
        }
        if (!password.equals(thisAdmin.getPassword())) {
            return false;
        }
        return true;
    }

    // 得到登陆的管理员信息
    public Admin getThisAdmin(String username) {
        return adminMapper.selectOneByUsername(username);
    }

    // 注册管理员
    public String signUpAdmin(Admin admin) {
        if (!adminMapper.selectOneByUsername(admin.getUsername()).equals(null)) {
            return "用户名已存在！";
        }
        Integer resultNumber = adminMapper.insertOneByObj(admin);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "注册成功！";
        } else {
            resultText = "注册失败！";
        }
        return resultText;
    }

    // 更改当前管理员密码
    public String changePassword(Admin admin) {
        Integer resultNumber = adminMapper.updateOneByObj(admin);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "密码修改成功！" ;
        } else {
            resultText = "密码修改失败！";
        }
        return resultText;
    }

    // 注销当前管理员
    public String removeAdmin(Long id) {
        Integer resultNumber = adminMapper.deleteOneById(id);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "注销成功！";
        } else {
            resultText = "注销失败！";
        }
        return resultText;
    }

}
