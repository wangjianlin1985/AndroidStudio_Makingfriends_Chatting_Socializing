package com.ideabobo.model;

import java.io.Serializable;

public class Bill implements Serializable {
    private Integer id;

    private String gids;

    private String price;

    private String user;

    private String uid;

    private String shop;

    private String bill;

    private String openid;

    private String ndate;

    private String total;

    private String way;

    private String gnames;

    private String sid;

    private String tel;

    private String address;

    private String note;

    private String state;

    private String statecn;

    private String cuidan;

    private Integer qid;

    private String qusername;

    private String qtel;

    private String img;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGids() {
        return gids;
    }

    public void setGids(String gids) {
        this.gids = gids == null ? null : gids.trim();
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price == null ? null : price.trim();
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user == null ? null : user.trim();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid == null ? null : uid.trim();
    }

    public String getShop() {
        return shop;
    }

    public void setShop(String shop) {
        this.shop = shop == null ? null : shop.trim();
    }

    public String getBill() {
        return bill;
    }

    public void setBill(String bill) {
        this.bill = bill == null ? null : bill.trim();
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid == null ? null : openid.trim();
    }

    public String getNdate() {
        return ndate;
    }

    public void setNdate(String ndate) {
        this.ndate = ndate == null ? null : ndate.trim();
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total == null ? null : total.trim();
    }

    public String getWay() {
        return way;
    }

    public void setWay(String way) {
        this.way = way == null ? null : way.trim();
    }

    public String getGnames() {
        return gnames;
    }

    public void setGnames(String gnames) {
        this.gnames = gnames == null ? null : gnames.trim();
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid == null ? null : sid.trim();
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel == null ? null : tel.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    public String getStatecn() {
        return statecn;
    }

    public void setStatecn(String statecn) {
        this.statecn = statecn == null ? null : statecn.trim();
    }

    public String getCuidan() {
        return cuidan;
    }

    public void setCuidan(String cuidan) {
        this.cuidan = cuidan == null ? null : cuidan.trim();
    }

    public Integer getQid() {
        return qid;
    }

    public void setQid(Integer qid) {
        this.qid = qid;
    }

    public String getQusername() {
        return qusername;
    }

    public void setQusername(String qusername) {
        this.qusername = qusername == null ? null : qusername.trim();
    }

    public String getQtel() {
        return qtel;
    }

    public void setQtel(String qtel) {
        this.qtel = qtel == null ? null : qtel.trim();
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }
}