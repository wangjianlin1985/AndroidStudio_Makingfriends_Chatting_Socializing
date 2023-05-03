package com.ideabobo.util;

import java.util.ArrayList;

public class EditorUpload {
    private int errno;
    private ArrayList<String> data;

    public int getErrno() {
        return errno;
    }

    public void setErrno(int errno) {
        this.errno = errno;
    }

    public ArrayList<String> getData() {
        return data;
    }

    public void setData(ArrayList<String> data) {
        this.data = data;
    }
}
