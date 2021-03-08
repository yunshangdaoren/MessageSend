package com.lqs.sms;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
//扫描Mapper
@MapperScan("com.lqs.sms.mapper")
@EnableAsync        // 2.开启多线程
//public class SMSSendApplication extends SpringBootServletInitializer{
public class SMSSendApplication{
//	@Override
//	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//		return builder.sources(SMSSendApplication.class);
//	}
	public static void main(String[] args) {
		SpringApplication.run(SMSSendApplication.class, args);
	}

}
