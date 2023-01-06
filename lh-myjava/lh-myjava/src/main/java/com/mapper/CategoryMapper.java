package com.mapper;


import com.pojo.Category;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CategoryMapper {
    /**
     * 增加一条数据link
     * @param category 数据
     */
    int categoryAdd(Category category);

    /**
     * 删除一条数据
     * @param id 被删除数据的id
     */
    int categoryDelete(Integer id);

    /**
     * 修改一条数据
     * @param category 修改的数据
     */
    void categoryUpdate(Category category);

    /**
     * 根据id去查询一条数据
     * @param id 查询的id
     */
    Category categoryQueryById(Integer id);

    /**
     * 查询全部数据
     * @return
     */
    List<Category> categoryQueryAll();


}
