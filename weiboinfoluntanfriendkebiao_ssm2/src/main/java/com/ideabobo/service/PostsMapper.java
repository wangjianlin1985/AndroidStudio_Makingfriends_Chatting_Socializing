package com.ideabobo.service;

import com.ideabobo.model.Posts;

public interface PostsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Posts record);

    int insertSelective(Posts record);

    Posts selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Posts record);

    int updateByPrimaryKey(Posts record);
}