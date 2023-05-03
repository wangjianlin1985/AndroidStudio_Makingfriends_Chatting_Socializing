package com.ideabobo.service;

import com.ideabobo.model.Daka;

public interface DakaMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Daka record);

    int insertSelective(Daka record);

    Daka selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Daka record);

    int updateByPrimaryKey(Daka record);
}