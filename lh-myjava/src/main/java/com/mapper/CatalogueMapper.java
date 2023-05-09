package com.mapper;

import com.pojo.Catalogue;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 目录接口
 */
@Repository
@Mapper
public interface CatalogueMapper {

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
