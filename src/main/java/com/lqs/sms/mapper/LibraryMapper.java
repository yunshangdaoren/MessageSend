package com.lqs.sms.mapper;

import com.lqs.sms.entity.Library;
import com.lqs.sms.entity.LibraryExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LibraryMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	long countByExample(LibraryExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int deleteByExample(LibraryExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int deleteByPrimaryKey(Integer lbId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int insert(Library record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int insertSelective(Library record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	List<Library> selectByExample(LibraryExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	Library selectByPrimaryKey(Integer lbId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int updateByExampleSelective(@Param("record") Library record, @Param("example") LibraryExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int updateByExample(@Param("record") Library record, @Param("example") LibraryExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int updateByPrimaryKeySelective(Library record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table library
	 * @mbg.generated  Mon Mar 08 19:34:27 CST 2021
	 */
	int updateByPrimaryKey(Library record);
}