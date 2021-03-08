package com.lqs.sms.scheduling;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

/**
 * 职工入职数量统计定时任务
 * 每天凌晨00:00:00自动生成当天的职工入职数量统计记录
 * @author luckyliuqs
 *
 */
@Configuration
@EnableScheduling   // 1.开启定时任务
@EnableAsync        // 2.开启多线程
public class SMSScheduling {
	
    //@Scheduled(cron = "*/1 * * * * ?")
    public static void run1() throws InterruptedException {
       System.out.println("开始1.....");
    }
   // @Scheduled(cron = "*/2 * * * * ?")
    public static void run2() throws InterruptedException {
       System.out.println("开始2.....");
    }
    
    
}
