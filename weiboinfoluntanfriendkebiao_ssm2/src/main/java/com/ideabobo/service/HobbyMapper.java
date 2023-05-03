package com.ideabobo.service;

import com.ideabobo.model.Hobby;

import java.util.List;

public interface HobbyMapper {

    List<Hobby> listAll();

    Hobby getById(Integer id);

    int add(Hobby hobby);

    int update(Hobby hobby);

    int delete(Integer id);

}
