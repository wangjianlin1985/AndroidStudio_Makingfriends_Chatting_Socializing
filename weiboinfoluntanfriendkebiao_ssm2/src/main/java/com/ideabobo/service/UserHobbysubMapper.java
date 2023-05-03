package com.ideabobo.service;

import com.ideabobo.model.UserHobbysub;

import java.util.List;

public interface UserHobbysubMapper {

    List<UserHobbysub> listByUserid(Integer userid);

    List<UserHobbysub> listBySubid(Integer hobbysubid);

    int add(UserHobbysub sub);

    int deleteByUserid(Integer userid);

}
