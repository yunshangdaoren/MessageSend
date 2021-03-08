package com.lqs.sms.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lqs.sms.entity.Phone;
import com.lqs.sms.json.JsonCommonResult;
import com.lqs.sms.service.impl.PhoneServiceImpl;
import com.lqs.sms.util.PageRequest;
import com.lqs.sms.util.PageResult;
import com.lqs.sms.util.PageResultUtil;
import com.lqs.sms.util.StringUtil;


@Controller
public class TestSendController {
	@Autowired
	private PhoneServiceImpl phoneServiceImpl;
	@Autowired
	private StringUtil stringUtil;
	@Autowired
	private RestTemplate restTemplate;
	ResultSet rs = null;
    Statement stmt = null;
    Connection conn = null;
	
	@RequestMapping("testSend")
	public String page_phoneList(HttpServletRequest request, PageRequest pageRequest, ModelMap map) {
		return "testSend";
	}
	
	@RequestMapping("smsLingDao.do")
	@ResponseBody
	public JsonCommonResult<Object>  smsLingDao(){
		String SMSStr = getSMSStr("zhw_lingdaoribao");
		
		if (stringUtil.isEmpty(SMSStr)) {
			return new JsonCommonResult<Object>("200", null, "没有信息！");
		}else if (stringUtil.isEquqls(SMSStr, "连接失败")) {
			return new JsonCommonResult<Object>("100", null, "连接失败！");
		}else {
			return new JsonCommonResult<Object>("200", SMSStr, "获取成功！");
		}
	}
	
	@RequestMapping("smsYiWu.do")
	@ResponseBody
	public JsonCommonResult<Object>  smsYiWu(){
		String SMSStr = getSMSStr("zhw_yiwubaosong");
		
		if (stringUtil.isEmpty(SMSStr)) {
			return new JsonCommonResult<Object>("200", null, "没有信息！");
		}else if (stringUtil.isEquqls(SMSStr, "连接失败")) {
			return new JsonCommonResult<Object>("100", null, "连接失败！");
		}else {
			return new JsonCommonResult<Object>("200", SMSStr, "获取成功！");
		}
	}
	
	@GetMapping("smsLingDaoSend.do")
	@ResponseBody
    public JsonCommonResult<Object> smsLingDaoSend(HttpServletRequest request){
		//短信内容
		String smsContentStr = request.getParameter("smsContent");
		System.out.println("短信内容:"+smsContentStr);
        String url="http://47.93.25.215:8088/sms.aspx?action=send&rt=json&userid=113&account=cqsrm001&password=cqsrm001@&mobile=15310443790,13617635018,15213237157&content="+smsContentStr+"&sendTime=&extno=";
        ResponseEntity<String> results = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
        String json = results.getBody();
        System.out.println("json: "+json);
		
        return new JsonCommonResult<Object>("200", json, "发送成功！");
    }
	
	@GetMapping("smsYiWuSend.do")
	@ResponseBody
    public JsonCommonResult<Object> smsYiWuSend(HttpServletRequest request){
		//短信内容
		String smsContentStr = request.getParameter("smsContent");
		System.out.println("短信内容:"+smsContentStr);
        String url="http://47.93.25.215:8088/sms.aspx?action=send&rt=json&userid=113&account=cqsrm001&password=cqsrm001@&mobile=15310443790,13617635018,15213237157&content="+smsContentStr+"&sendTime=&extno=";
        ResponseEntity<String> results = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
        String json = results.getBody();
        System.out.println("json: "+json);
		
        return new JsonCommonResult<Object>("200", json, "发送成功！");
    }
	
	public String getSMSStr(String viewNameStr) {
		String SMSStr = "";
        try {
            Class.forName("oracle.jdbc.OracleDriver");
            //192.168.0.3
            String dbURL = "jdbc:oracle:thin:@192.168.0.3:1521:orcl";
            conn = DriverManager.getConnection(dbURL, "zl_yd", "zl_yd");
            //System.out.println("连接成功");
            
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from "+viewNameStr);
            //System.out.println("查询结果如下：");
            while (rs.next()) {
				SMSStr += rs.getString(1);
			}
            rs.close();
            conn.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "连接失败";
        } catch (SQLException e) {
            e.printStackTrace();
            return "连接失败";
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    rs = null;
                }
                if (stmt != null) {
                    stmt.close();
                    stmt = null;
                }
                if (conn != null) {
                    conn.close();
                    conn = null;
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return "连接失败";
            }
        }
        return SMSStr;
	}
	
}
