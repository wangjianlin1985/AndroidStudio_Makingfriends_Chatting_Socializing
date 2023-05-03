package com.ideabobo.model;

import java.io.Serializable;

public class UserHobbysub implements Serializable {

    private Integer id;

    private Integer userid;

    private String username;

    private Integer hobbysubid;

    private String hobbysubname;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getHobbysubid() {
        return hobbysubid;
    }

    public void setHobbysubid(Integer hobbysubid) {
        this.hobbysubid = hobbysubid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHobbysubname() {
        return hobbysubname;
    }

    public void setHobbysubname(String hobbysubname) {
        this.hobbysubname = hobbysubname;
    }
}
