package com.lqs.sms.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.jsp.el.ELParseException;

import org.springframework.stereotype.Component;

@Component
public class DataBaseUrlUtil {
	//Oracle驱动名称
	private String Driver_Oracle = "oracle.jdbc.OracleDriver";
	//MySQL驱动名称
	private String Driver_Mysql  = "com.mysql.cj.jdbc.Driver";
	
	//Oracle地址前缀
	private String Prefix_Oracle = "jdbc:oracle:thin:@";
	//MySQL地址前缀
	private String Prefix_Mysql  = "jdbc:mysql://";
	
	//Oracle地址后缀
	private String Suffix_Oracle = "?useUnicode=true&characterEncoding=UTF-8;";
	//MySQL地址后缀
	private String Suffix_Mysql  = "?useUnicode=true&characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai";
	public String getDriver_Oracle() {
		return Driver_Oracle;
	}
	public String getDriver_Mysql() {
		return Driver_Mysql;
	}
	public String getPrefix_Oracle() {
		return Prefix_Oracle;
	}
	public String getPrefix_Mysql() {
		return Prefix_Mysql;
	}
	public String getSuffix_Oracle() {
		return Suffix_Oracle;
	}
	public String getSuffix_Mysql() {
		return Suffix_Mysql;
	}

	ResultSet rs = null;
    Statement stmt = null;
    Connection conn = null;
    
    //测试连接数据库是否成功
    public Boolean isConnect(String driverName,String url, String userName, String password) {
    	try {
    		Class.forName(driverName);
            conn = DriverManager.getConnection(url, userName, password);
            if (conn != null) {
            	 conn.close();
            	 return true;
			}else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
    }
    
    //测试视图是否存在
    public Boolean isViewExit(String driverName,String url, String userName, String password,String viewNameStr) {
    	try {
    		Class.forName(driverName);
            conn = DriverManager.getConnection(url, userName, password);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from "+viewNameStr);
            rs.close();
            conn.close();
            return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
    }
    
}
