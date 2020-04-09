package com.nju.chemicals.controller;

import com.nju.chemicals.entity.Admin;
import com.nju.chemicals.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // 登录
    @ResponseBody
    @RequestMapping("/login/{username}/{password}")
    public Boolean login(@PathVariable String username, @PathVariable String password) {
        return adminService.login(username, password);
    }

    // 得到登陆的管理员信息
    @ResponseBody
    @RequestMapping("/getThisAdmin/{username}")
    public Admin getThisAdmin(@PathVariable String username) {
        return adminService.getThisAdmin(username);
    }

    // 注册管理员
    @ResponseBody
    @RequestMapping("/signUpAdmin")
    public String signUpAdmin(Admin admin) {
        return adminService.signUpAdmin(admin);
    }

    // 更改当前管理员密码
    @ResponseBody
    @RequestMapping("/changePassword")
    public String changePassword(Admin admin) {
        return adminService.changePassword(admin);
    }

    // 注销当前管理员
    @ResponseBody
    @RequestMapping("/removeAdmin/{id}")
    public String removeAdmin(@PathVariable Long id) {
        return adminService.removeAdmin(id);
    }

}
