package com.ideabobo.service;

import com.ideabobo.model.Tiaokuan;

public interface TiaokuanMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Tiaokuan record);

    int insertSelective(Tiaokuan record);

    Tiaokuan selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Tiaokuan record);

    int updateByPrimaryKey(Tiaokuan record);
}