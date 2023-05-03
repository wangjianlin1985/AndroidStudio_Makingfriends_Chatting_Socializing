package com.ideabobo.controller;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
@RequestMapping(value = "/home")
public class HomeController {    
    @RequestMapping(value = "/setSession", produces = "text/plain; charset=utf-8", method = { RequestMethod.GET,
			RequestMethod.POST })
    @ResponseBody
    public String setSession(HttpServletRequest req) {
    	HttpSession session = req.getSession();
    	String key = req.getParameter("key");
    	String value = req.getParameter("value");
    	session.setAttribute(key, value);
    	
    	return null;
    }
    
    @RequestMapping(value = "/getSession", produces = "text/plain; charset=utf-8", method = { RequestMethod.GET,
			RequestMethod.POST })
    @ResponseBody
    public String getSession(HttpServletRequest req) {
    	HttpSession session = req.getSession();
    	String key = req.getParameter("key");
    	String value = session.getAttribute(key)==null?null:session.getAttribute(key).toString();
    	return value;
    }
    
}