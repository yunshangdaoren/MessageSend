package com.lqs.sms;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.lqs.sms.entity.Library;
import com.lqs.sms.entity.LibraryExample;
import com.lqs.sms.mapper.LibraryMapper;
import com.lqs.sms.util.DataBaseUrlUtil;
import com.lqs.sms.util.entity.LibraryInfoUtil;

@SpringBootTest
class MessageSendApplicationTests {
	@Autowired
	LibraryMapper LibraryMapper;
	@Autowired
	private LibraryInfoUtil libraryInfoUtil;
	ResultSet rs = null;
    Statement stmt = null;
    Connection conn = null;
    @Autowired
    private DataBaseUrlUtil dataBaseUrlUtil;
	
	@Test
	void contextLoads() {
		LibraryExample example = new LibraryExample();
		example.or().andLbIdEqualTo(1);
		List<Library> list = LibraryMapper.selectByExample(example);
		libraryInfoUtil.setLibraryInfo(list);
		for (Library library : list) {
			System.out.println("库类地址:"+library.getUrl());
			//System.out.println("库类型名称:"+library.getName());
		}
	}
	
	@Test
	void oracle() {
		String SMSStr = "";
		 try {
		 Class.forName(dataBaseUrlUtil.getDriver_Oracle());
        // String dbURL = "jdbc:oracle:thin:@192.168.0.3:1521:orcl";
         //conn = DriverManager.getConnection(dbURL, "zl_yd", "zl_yd");
         
         //String dbURL = "jdbc:oracle:thin:@localhost:1521:orcl?useUnicode=true&amp;characterEncoding=utf-8;";
		 String dbURL = dataBaseUrlUtil.getPrefix_Oracle()+"localhost:1521:orcl"+dataBaseUrlUtil.getSuffix_Oracle();
         conn = DriverManager.getConnection(dbURL, "C##ITEST", "root");
         //System.out.println("连接成功");
         
         stmt = conn.createStatement();
         rs = stmt.executeQuery("select * from STUDENT");
         //System.out.println("查询结果如下：");
         while (rs.next()) {
				SMSStr += rs.getString(1);
			}
         System.out.println("读取的值:"+SMSStr);
         rs.close();
         conn.close();
     } catch (ClassNotFoundException e) {
         e.printStackTrace();
     } catch (SQLException e) {
         e.printStackTrace();
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
         }
     }
	}
	
	@Test
	void mysql() {
		String SMSStr = "";
		 try {
		 Class.forName(dataBaseUrlUtil.getDriver_Mysql());
        // String dbURL = "jdbc:oracle:thin:@192.168.0.3:1521:orcl";
         //conn = DriverManager.getConnection(dbURL, "zl_yd", "zl_yd");
         
         String dbURL = dataBaseUrlUtil.getPrefix_Mysql()+"localhost:3306/sms"+dataBaseUrlUtil.getSuffix_Mysql();
         System.out.println("dbURL:"+dbURL);
         conn = DriverManager.getConnection(dbURL, "root", "root");
         System.out.println("连接成功");
         
         stmt = conn.createStatement();
         rs = stmt.executeQuery("select * from library");
         //System.out.println("查询结果如下：");
         while (rs.next()) {
				SMSStr +=" "+ rs.getString(1);
				SMSStr +=" "+ rs.getString(2);
				SMSStr +=" "+ rs.getString(3);
				SMSStr +=" "+ rs.getString(4);
				SMSStr +=" "+ rs.getString(5);
			}
         System.out.println("读取的值："+SMSStr);
         rs.close();
         conn.close();
     } catch (ClassNotFoundException e) {
         e.printStackTrace();
     } catch (SQLException e) {
         e.printStackTrace();
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
         }
     }
	}

	@Test
	void connect() {
		//oracle
		//boolean isConect = dataBaseUrlUtil.isConnect("oracle.jdbc.OracleDriver", "jdbc:oracle:thin:@localhost:1521:orcl", "C##ITEST", "root");
		//mysql
		boolean isConect = dataBaseUrlUtil.isConnect("com.mysql.cj.jdbc.Driver", "jdbc:mysql://127.0.0.1:3306/sms", "root", "root");
		System.out.println("值："+isConect);
	}
	
	@Test
	void view() {
		 try {
		 Class.forName("com.mysql.cj.jdbc.Driver");
         String dbURL = "jdbc:mysql://localhost:3306/sms?";
         conn = DriverManager.getConnection(dbURL, "root", "root");
         System.out.println("连接成功");
         
         stmt = conn.createStatement();
         rs = stmt.executeQuery("select * from stsuInfo");
         if (rs == null) {
			System.out.println("rs 为null");
		}else {
			System.out.println("rs 不为null");
		}
         while (rs.next()) {
        	 System.out.println("1");
			}
         rs.close();
         conn.close();
     } catch (ClassNotFoundException e) {
         e.printStackTrace();
     } catch (SQLException e) {
         e.printStackTrace();
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
         }
     }
	}
	
}
