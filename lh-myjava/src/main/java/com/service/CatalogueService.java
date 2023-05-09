package com.service;

import com.pojo.Catalogue;

import java.util.List;

public interface CatalogueService {

    /**
     * 增加一条数据
     */
    void CatalogueAdd(Catalogue catalogue);

    /**
     * 删除一条数据
     */
    void CatalogueDelete(Integer id);

    /**
     * 修改一条数据
     */
    void CatalogueUpdate(Catalogue catalogue);

    /**
     * 查询一条数据
     */
    List<Catalogue> catalogueQueryByCategory(String category);

    /**
     * 查询全部数据
     */
    List<Catalogue> CatalogueQueryAll();

}
