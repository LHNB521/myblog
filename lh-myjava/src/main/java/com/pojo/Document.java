package com.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 文档
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Document {

    private Integer article_id;
    private String article_title;
    private String article_content;
    private String article_date;
}
