package com.service.impl;

import com.mapper.LoginMapper;
import com.pojo.Login;
import com.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {
    @Autowired
    LoginMapper loginMapper;

    public Login loginQuery(String users) {
        return loginMapper.loginQuery(users);
    }
}
