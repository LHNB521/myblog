package com.controller;


import com.alibaba.fastjson.JSON;
import com.pojo.Catalogue;
import com.pojo.Category;
import com.service.CatalogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 目录接口
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/catalogue")
public class CatalogueController {
    @Autowired
    private CatalogueService catalogueService;

    /**
     * 查询全部
     */
    @ResponseBody
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public String CatalogueQueryAll(){
        List<Catalogue> catalogueList = catalogueService.CatalogueQueryAll();
        return JSON.toJSONString(catalogueList);
    }

    /**
     * 通过分类查询文档目录
     */
    @ResponseBody
    @RequestMapping(value = "/catalogueQuery", method = RequestMethod.POST)
    public String catalogueQueryByCategory(@RequestBody Catalogue category){
        List<Catalogue> catalogue = catalogueService.catalogueQueryByCategory(category.getCategory());
        return JSON.toJSONString(catalogue);
    }

    /**
     * 添加
     */
    @PostMapping
    @ResponseBody
    public String CatalogueAdd(@RequestBody Catalogue catalogue){
        catalogueService.CatalogueAdd(catalogue);
        return "添加目录";
    }

    /**
     * 删除
     */
    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public String CatalogueDelete(@PathVariable("id")Integer id){
        catalogueService.CatalogueDelete(id);
        return "目录删除成功";
    }

    /**
     * 修改
     */
    @PutMapping("/{id}")
    @ResponseBody
    public String CatalogueUpdate(@PathVariable("id")Integer id,@RequestBody Catalogue catalogue){
        catalogue.setId(id);
        catalogueService.CatalogueUpdate(catalogue);
        return "目录修改成功";
    }
}

