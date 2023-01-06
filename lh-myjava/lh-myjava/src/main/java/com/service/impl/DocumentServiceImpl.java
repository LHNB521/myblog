package com.service.impl;

import com.mapper.DocumentMapper;
import com.pojo.Document;
import com.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentMapper documentMapper;

    /**
     * 添加文章
     */
    @Override
    public int documentAdd(Document document){
        return documentMapper.documentAdd(document);
    }

    /**
     * 删除文章
     */
    @Override
    public void documentDelete(Integer id){
        documentMapper.documentDelete(id);
    }

    /**
     * 更新文章
     */
    @Override
    public void documentUpdate(Document document) {
        documentMapper.documentUpdate(document);
    }

    /**
     * 查寻
     */
    @Override
    public Document documentQuery(String catalogue) {
        return documentMapper.documentQuery(catalogue);
    }

    /**
     * 查询全部文章
     */
    @Override
    public List<Document> documentQueryAll() {
        return documentMapper.documentQueryAll();
    }

}
