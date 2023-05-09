package com.mapper;

import com.pojo.Login;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface LoginMapper {
    /**
     * 查询登录信息数据
     */
    Login loginQuery(String username);
}
