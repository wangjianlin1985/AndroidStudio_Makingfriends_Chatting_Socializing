package com.ideabobo.model;

import java.io.Serializable;

public class Choose implements Serializable {
    private Integer id;

    private String title;

    private String daan;

    private String opa;

    private String opb;

    private String opc;

    private String opd;

    private String fenxi;

    private Integer typeid;

    private String img;

    private Integer leixing;

    private Integer rc;

    private Integer wc;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getDaan() {
        return daan;
    }

    public void setDaan(String daan) {
        this.daan = daan == null ? null : daan.trim();
    }

    public String getOpa() {
        return opa;
    }

    public void setOpa(String opa) {
        this.opa = opa == null ? null : opa.trim();
    }

    public String getOpb() {
        return opb;
    }

    public void setOpb(String opb) {
        this.opb = opb == null ? null : opb.trim();
    }

    public String getOpc() {
        return opc;
    }

    public void setOpc(String opc) {
        this.opc = opc == null ? null : opc.trim();
    }

    public String getOpd() {
        return opd;
    }

    public void setOpd(String opd) {
        this.opd = opd == null ? null : opd.trim();
    }

    public String getFenxi() {
        return fenxi;
    }

    public void setFenxi(String fenxi) {
        this.fenxi = fenxi == null ? null : fenxi.trim();
    }

    public Integer getTypeid() {
        return typeid;
    }

    public void setTypeid(Integer typeid) {
        this.typeid = typeid;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }

    public Integer getLeixing() {
        return leixing;
    }

    public void setLeixing(Integer leixing) {
        this.leixing = leixing;
    }

    public Integer getRc() {
        return rc;
    }

    public void setRc(Integer rc) {
        this.rc = rc;
    }

    public Integer getWc() {
        return wc;
    }

    public void setWc(Integer wc) {
        this.wc = wc;
    }
}