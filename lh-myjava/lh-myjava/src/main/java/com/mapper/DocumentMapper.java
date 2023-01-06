package com.mapper;


import com.pojo.Document;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DocumentMapper {

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
