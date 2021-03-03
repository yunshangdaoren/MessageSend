package com.lqs.ms;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//扫描Mapper
@MapperScan("com.lqs.hrm.mapper")
public class MessageSendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MessageSendApplication.class, args);
	}

}
