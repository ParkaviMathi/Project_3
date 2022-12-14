CREATE TABLE mines_db(
	SITE_CODE VARCHAR(15) PRIMARY KEY,
	SHORT_TITLE VARCHAR(100),
	TITLE VARCHAR(100),
	STAGE VARCHAR(50),
	PROJECT_TITLE VARCHAR(100),
	LONGITUDE float8,
	LATITUDE float8,
	EASTING INT,
	NORTHING INT,
	MGA_ZONE INT,
	COMMODITIES VARCHAR(100),
	COMMODITY_GROUP_NAME VARCHAR(100),
	TARGET_GROUP_NAME VARCHAR(100),
	EXTRACT_DATE DATE
);	

DROP TABLE mines_db;

SELECT *
FROM mines_db;

CREATE TABLE clean_mines_db
AS SELECT SITE_CODE,SHORT_TITLE,STAGE, LONGITUDE,LATITUDE,TARGET_GROUP_NAME
FROM mines_db;