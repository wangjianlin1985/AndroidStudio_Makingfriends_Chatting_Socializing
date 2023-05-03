package com.ideabobo.service;

import com.ideabobo.model.Choose;

public interface ChooseMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Choose record);

    int insertSelective(Choose record);

    Choose selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Choose record);

    int updateByPrimaryKey(Choose record);
}