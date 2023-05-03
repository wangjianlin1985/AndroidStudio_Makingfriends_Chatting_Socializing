package com.ideabobo.model;

import java.io.Serializable;

public class Hobbysub implements Serializable {

    private Integer id;

    private String name;

    private Integer hobbyid;

    private String hobbyname;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHobbyid() {
        return hobbyid;
    }

    public void setHobbyid(Integer hobbyid) {
        this.hobbyid = hobbyid;
    }

    public String getHobbyname() {
        return hobbyname;
    }

    public void setHobbyname(String hobbyname) {
        this.hobbyname = hobbyname;
    }
}
