package com.controller;

import com.alibaba.fastjson.JSON;
import com.bean.ResponseBean;
import com.pojo.Document;
import com.service.DocumentService;
import com.utils.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    /**
     * 查询全部
     */
    @RequestMapping(value = "/allDocument", method = RequestMethod.GET)
    public List<Document> documentQueryAll(){
        return documentService.documentQueryAll();
    }

    /**
     * 查询文档
     */
    @ResponseBody
    @RequestMapping(value = "/documentQuery", method = RequestMethod.POST)
    public Document documentQuery(@RequestBody Document document){
        Document documents = documentService.documentQuery(document.getArticle_title());
        System.out.println(documentService.documentQuery(document.getArticle_title()));
        return documents;
    }

    /**
     * 添加文档
     */
    //@RequestBody 表示接收请求是JSON格式的数据
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @Token
    public ResponseBean documentAdd(@RequestBody Document document){
        int t = documentService.documentAdd(document);
        if (t == 1){
            return new ResponseBean("success", "添加成功!");
        }else {
            return new ResponseBean("error", "添加失败!");
        }
    }

    /**
     * 删除
     */
    //Delete请求
    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public String documentDelete(@PathVariable("id")Integer id){
        documentService.documentDelete(id);
        return "删除成功";
    }

    /**
     * 修改
     */
    //Put请求
    @PutMapping("/{id}")
    @ResponseBody
    public String documentUpdate(@PathVariable("id")Integer id, @RequestBody Document document){
        document.setArticle_id(id);
        documentService.documentUpdate(document);
        return "修改成功";
    }
}
