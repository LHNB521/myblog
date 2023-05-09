package com.service;


import com.pojo.Login;

public interface LoginService {
    /**
     * 查询登录信息数据
     */
    Login loginQuery(String users);
}
