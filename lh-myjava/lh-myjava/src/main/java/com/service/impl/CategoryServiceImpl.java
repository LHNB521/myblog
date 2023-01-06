package com.service.impl;

import com.mapper.CategoryMapper;
import com.pojo.Category;
import com.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryMapper categoryMapper;

    public int categoryAdd(Category category) {
        return categoryMapper.categoryAdd(category);
    }

    public int categoryDelete(Integer id) {
        return categoryMapper.categoryDelete(id);
    }

    public void categoryUpdate(Category category) {

        categoryMapper.categoryUpdate(category);
    }

    public Category categoryQueryById(Integer id) {

        return categoryMapper.categoryQueryById(id);
    }

    public List<Category> categoryQueryAll() {
        return categoryMapper.categoryQueryAll();
    }
}
