package com.lqs.sms.entity;

public class View {
    /**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column view.vi_id
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	private Integer viId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column view.lb_id
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	private Integer lbId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column view.name
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	private String name;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column view.description
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	private String description;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column view.vi_id
	 * @return  the value of view.vi_id
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public Integer getViId() {
		return viId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column view.vi_id
	 * @param viId  the value for view.vi_id
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public void setViId(Integer viId) {
		this.viId = viId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column view.lb_id
	 * @return  the value of view.lb_id
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public Integer getLbId() {
		return lbId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column view.lb_id
	 * @param lbId  the value for view.lb_id
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public void setLbId(Integer lbId) {
		this.lbId = lbId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column view.name
	 * @return  the value of view.name
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public String getName() {
		return name;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column view.name
	 * @param name  the value for view.name
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column view.description
	 * @return  the value of view.description
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column view.description
	 * @param description  the value for view.description
	 * @mbg.generated  Mon Mar 08 23:46:11 CST 2021
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	public View(Integer lbId, String name, String description) {
		super();
		this.lbId = lbId;
		this.name = name;
		this.description = description;
	}

    
}