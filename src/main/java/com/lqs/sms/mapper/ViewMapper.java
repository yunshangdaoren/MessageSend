package com.lqs.sms.mapper;

import com.lqs.sms.entity.View;
import com.lqs.sms.entity.ViewExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ViewMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    long countByExample(ViewExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int deleteByExample(ViewExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int deleteByPrimaryKey(Integer viId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int insert(View record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int insertSelective(View record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    List<View> selectByExample(ViewExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    View selectByPrimaryKey(Integer viId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int updateByExampleSelective(@Param("record") View record, @Param("example") ViewExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int updateByExample(@Param("record") View record, @Param("example") ViewExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int updateByPrimaryKeySelective(View record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view
     *
     * @mbg.generated Fri Mar 05 18:31:43 CST 2021
     */
    int updateByPrimaryKey(View record);
}