package com.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bean.UserBean;
import java.util.Date;

public class TokenUtil {

    private static final long EXPIRE_TIME = 10*60*60*1000; // token到期时间10小时
    private static final String TOKEN_SECRET = "123456"; //秘钥

    /**
     * 生成token
     */
    public static String sing(UserBean userBean){
        String token = null;
        try{
            Date expireAt = new Date(System.currentTimeMillis()+EXPIRE_TIME);
            token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("username",userBean.getUsername())
                    .withExpiresAt(expireAt)
                    .sign(Algorithm.HMAC256(TOKEN_SECRET));
        }catch (IllegalArgumentException | JWTCreationException je){

        }
        return token;
    }

    /**
     * 验证token
     */
    public static Boolean verify(String token){
        try{
            JWTVerifier jwtVerifier=JWT.require(Algorithm.HMAC256(TOKEN_SECRET))
                    .withIssuer("auth0")
                    .build();
            DecodedJWT decodedJWT=jwtVerifier.verify(token);
        }catch (IllegalArgumentException | JWTVerificationException e){
            return false;
        }
        return true;
    }
}
