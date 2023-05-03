package com.ideabobo.service;

import com.ideabobo.model.Hobby;
import com.ideabobo.model.Hobbysub;

import java.util.List;

public interface HobbysubMapper {

    List<Hobbysub> listAll();

    List<Hobbysub> listByHobbyId(Integer hobbyid);

    Hobbysub getById(Integer id);

    int add(Hobbysub hobbysub);

    int update(Hobbysub hobbysub);

    int delete(Integer id);

}
