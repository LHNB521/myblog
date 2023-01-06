package com.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 分类
 */
//使用@Data自动生成需要的get、set
@Data
//使用@AllArgsConstructor自动生成有参构造
@AllArgsConstructor
//使用@NoArgsConstructor自动生成无参构造
@NoArgsConstructor
public class Category {

    private Integer category_id; // 分类ID
    private String category_name; // 分类名称
    private String category_alias; // 分类别名
    private String category_description;  // 分类描述
    private String parent_category_id; // 父级分类id
}
