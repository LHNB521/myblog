package com.controller;

import com.bean.UserBean;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pojo.Login;
import com.service.LoginService;
import com.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;
@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    LoginService loginService;
    /**
     * 登录
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(@RequestBody Login login) throws JsonProcessingException {
        UserBean userBean = new UserBean();
        userBean.setUsername(login.getUsername());
        userBean.setPassword(login.getPassword());

        Login login1 = loginService.loginQuery(login.getUsername());
        if(!Objects.equals(login1.getPassword(), login.getPassword())
                || !Objects.equals(login1.getUsername(), login.getUsername())){
            return "登录失败";
        }
        String token = TokenUtil.sing(userBean);
        HashMap<String,Object> hs = new HashMap<>();
        hs.put("token",token);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(hs);
    }
}
