package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.bean.ResponseBean;
import com.pojo.Category;
import com.service.CategoryService;
import com.utils.Token;
import com.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(value = "/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * 查询全部
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Category> categoryQueryAll(){
        return categoryService.categoryQueryAll();
    }

    /**
     * 添加@验证token
     */
    //@RequestBody 表示接收请求是JSON格式的数据
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @Token
    public ResponseBean categoryAdd(@RequestBody Category category){
        if("".equals(category.getCategory_name())||category.getCategory_name() == null){
            return new ResponseBean("error", "请输入分类名称！");
        }
        int t = categoryService.categoryAdd(category);
        if (t == 1){
            return new ResponseBean("success", "添加成功!");
        }else {
            return new ResponseBean("error", "添加失败!");
        }
    }

    /**
     * 删除@验证token
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @Token
    public ResponseBean categoryDelete(@RequestBody Category category){
        int t = categoryService.categoryDelete(category.getCategory_id());
        if (t == 1) {
            return new ResponseBean("success", "删除成功!");
        }else {
            return new ResponseBean("error", "没有要删除的内容!");
        }
    }

    /**
     * 修改
     */
    //Put请求
    @PutMapping("/{id}")
    @ResponseBody
    public String categoryUpdate(@PathVariable("id")Integer id, @RequestBody Category category){
        category.setCategory_id(id);
        categoryService.categoryUpdate(category);
        return "修改成功";
    }
}
