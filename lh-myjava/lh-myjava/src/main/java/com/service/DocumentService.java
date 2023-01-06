package com.service;

import com.pojo.Document;

import java.util.List;

public interface DocumentService {
    /**
     * 增加一条数据
     */
    int documentAdd(Document document);

    /**
     * 删除一条数据
     */
    void documentDelete(Integer id);

    /**
     * 修改一条数据
     */
    void documentUpdate(Document document);

    /**
     * 根据id去查询一条数据
     */
    Document documentQuery(String catalogue);

    /**
     * 查询全部数据
     */
    List<Document> documentQueryAll();
}
