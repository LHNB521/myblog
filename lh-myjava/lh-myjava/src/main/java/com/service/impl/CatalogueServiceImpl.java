package com.service.impl;

import com.mapper.CatalogueMapper;
import com.pojo.Catalogue;
import com.service.CatalogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogueServiceImpl implements CatalogueService {

    @Autowired
    private CatalogueMapper catalogueMapper;

    @Override
    public void CatalogueAdd(Catalogue catalogue){
        catalogueMapper.CatalogueAdd(catalogue);
    }

    @Override
    public void CatalogueDelete(Integer id){
        catalogueMapper.CatalogueDelete(id);
    }

    @Override
    public void CatalogueUpdate(Catalogue catalogue){
        catalogueMapper.CatalogueUpdate(catalogue);
    }

    public List<Catalogue> catalogueQueryByCategory(String category){
        return catalogueMapper.catalogueQueryByCategory(category);
    }

    @Override
    public List<Catalogue> CatalogueQueryAll(){
        return catalogueMapper.CatalogueQueryAll();
    }

}
