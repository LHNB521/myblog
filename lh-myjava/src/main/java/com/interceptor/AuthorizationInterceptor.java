package com.interceptor;


import com.utils.Token;
import com.utils.TokenUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthorizationInterceptor implements HandlerInterceptor{

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,Object handler) throws Exception{
        Token annotation;
        if(handler instanceof  HandlerMethod){
            annotation = ((HandlerMethod) handler).getMethodAnnotation(Token.class);
        }else {
            return true;
        }
        // 没有声明需要权限，或者不验证权限
        if(annotation == null || !annotation.validate()){
            return true;
        }

        // 从header中获取token
        String token = request.getHeader("token");
        if(token == null){
            System.out.println("缺少token,拒绝访问");
            return false;
        }

        // 查询token信息
        boolean result= TokenUtil.verify(token);
        if(!result){
            System.out.println("token不正确");
            return false;
        }
        return true;
    }
}
