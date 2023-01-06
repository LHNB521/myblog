package com.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 目录类
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Catalogue {

    private Integer id;
    private String title;
    private String url;
    private String description;
    private String category;
}
