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
		 Class.forName("oracle.jdbc.OracleDriver");
         String dbURL = "jdbc:oracle:thin:@192.168.0.3:1521:orcl";
         conn = DriverManager.getConnection(dbURL, "zl_yd", "zl_yd");
         //System.out.println("连接成功");
         
         stmt = conn.createStatement();
         rs = stmt.executeQuery("select * from zhw_lingdaoribao");
         //System.out.println("查询结果如下：");
         while (rs.next()) {
				SMSStr += rs.getString(1);
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
