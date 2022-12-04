-- MySQL dump 10.13  Distrib 8.0.30, for macos12.4 (arm64)
--
-- Host: 127.0.0.1    Database: populmap
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_site`
--

DROP TABLE IF EXISTS `auth_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_site` (
  `site_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_user_id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_login` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_temporary` boolean DEFAULT false NOT NULL,
  PRIMARY KEY (`site_id`),
  UNIQUE KEY `site_user_id` (`site_user_id`),
  CONSTRAINT `site_user_id` FOREIGN KEY (`site_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_site`
--

LOCK TABLES `auth_site` WRITE;
/*!40000 ALTER TABLE `auth_site` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_social`
--

DROP TABLE IF EXISTS `auth_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_social` (
  `social_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'user의 fk',
  `social_user_id` varchar(64) DEFAULT NULL,
  `social_type` varchar(16) NOT NULL,
  `access_token` varchar(256) NOT NULL,
  `first_login` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`social_id`),
  UNIQUE KEY `access_token` (`access_token`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `social_id` (`social_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_social`
--

LOCK TABLES `auth_social` WRITE;
/*!40000 ALTER TABLE `auth_social` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `bookmark_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '북마크 ID',
  `bookmark_user_id` int(11) NOT NULL COMMENT '유저의 ID',
  `bookmark_event_id` int(11) NOT NULL COMMENT '이벤트 ID',
  PRIMARY KEY (`bookmark_id`),
  KEY `bookmark_event_id` (`bookmark_event_id`),
  KEY `bookmark_user_id` (`bookmark_user_id`),
  CONSTRAINT `bookmark_event_id` FOREIGN KEY (`bookmark_event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmark_user_id` FOREIGN KEY (`bookmark_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='행사 북마크';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `place` varchar(64) NOT NULL COMMENT '장소명',
  `type` varchar(64) NOT NULL COMMENT '장소 구분',
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_accident`
--

DROP TABLE IF EXISTS `city_accident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_accident` (
  `accident_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '사고/행사 ID',
  `accident_city_id` int(11) NOT NULL,
  `begin_time` datetime DEFAULT NULL COMMENT '사고/행사 발생 시간',
  `end_time` datetime DEFAULT NULL COMMENT '사고/행사 후 정상화 예상 시간',
  `type` varchar(64) DEFAULT NULL COMMENT '사고/행사 유형',
  `detail_type` varchar(64) DEFAULT NULL COMMENT '사고/행사 상세 유형',
  `lat` double DEFAULT NULL COMMENT '위도',
  `lng` double DEFAULT NULL COMMENT '경도',
  `update_time` datetime DEFAULT NULL COMMENT '업데이트 시간',
  PRIMARY KEY (`accident_id`),
  KEY `accident_city_id` (`accident_city_id`),
  CONSTRAINT `accident_city_id` FOREIGN KEY (`accident_city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_accident`
--

LOCK TABLES `city_accident` WRITE;
/*!40000 ALTER TABLE `city_accident` DISABLE KEYS */;
/*!40000 ALTER TABLE `city_accident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_people`
--

DROP TABLE IF EXISTS `city_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_people` (
  `people_id` int(11) NOT NULL AUTO_INCREMENT,
  `people_city_id` int(11) NOT NULL,
  `density_level` varchar(64) NOT NULL COMMENT '밀집도 수준',
  `message` varchar(1024) DEFAULT NULL COMMENT '밀집도 설명 메시지',
  `density_min` int(11) DEFAULT NULL COMMENT '최소 인원',
  `density_max` int(11) DEFAULT NULL COMMENT '최대 인원',
  `resident_ratio` int(11) DEFAULT NULL COMMENT '상주 인구 비율',
  `nonresident_ratio` int(11) DEFAULT NULL COMMENT '비상주 인구 비율',
  `lat` double DEFAULT NULL COMMENT '위도',
  `lng` double DEFAULT NULL COMMENT '경도',
  `update_time` datetime DEFAULT NULL COMMENT '업데이트 시간',
  PRIMARY KEY (`people_id`),
  UNIQUE KEY `people_city_id` (`people_city_id`),
  CONSTRAINT `people_city_id` FOREIGN KEY (`people_city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_people`
--

LOCK TABLES `city_people` WRITE;
/*!40000 ALTER TABLE `city_people` DISABLE KEYS */;
/*!40000 ALTER TABLE `city_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_road`
--

DROP TABLE IF EXISTS `city_road`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_road` (
  `road_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '도로 정보 ID',
  `road_city_id` int(11) NOT NULL,
  `density_level` varchar(64) DEFAULT NULL COMMENT '밀집도 수준',
  `message` varchar(1024) DEFAULT NULL COMMENT '밀집도 설명 메시지',
  `speed` varchar(16) DEFAULT NULL COMMENT '평균 차량 속도',
  `update_time` datetime DEFAULT NULL COMMENT '업데이트 시간',
  PRIMARY KEY (`road_id`),
  KEY `road_city_id` (`road_city_id`),
  CONSTRAINT `road_city_id` FOREIGN KEY (`road_city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_road`
--

LOCK TABLES `city_road` WRITE;
/*!40000 ALTER TABLE `city_road` DISABLE KEYS */;
/*!40000 ALTER TABLE `city_road` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '이벤트 ID',
  `title` varchar(128) DEFAULT NULL COMMENT '행사명',
  `address` varchar(128) DEFAULT NULL COMMENT '행사 장소의 주소',
  `lat` double DEFAULT NULL COMMENT '위도',
  `lng` double DEFAULT NULL COMMENT '경도',
  `progress` varchar(16) NOT NULL COMMENT '행사 진행 여부',
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='행사 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_detail`
--

DROP TABLE IF EXISTS `event_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_detail` (
  `event_detail_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '행사 상세 정보 ID',
  `event_id` int(11) NOT NULL COMMENT '이벤트 ID',
  `call` varchar(32) DEFAULT NULL COMMENT '전화번호',
  `description` text DEFAULT NULL COMMENT '행사 부가 설명',
  `fee` varchar(32) DEFAULT NULL COMMENT '이용 요금',
  `begin_date` datetime DEFAULT NULL COMMENT '헹시 시작 날짜',
  `end_date` datetime DEFAULT NULL COMMENT '행사 종료 날짜',
  `modified_date` datetime DEFAULT NULL COMMENT '수정 날짜',
  `url` text DEFAULT NULL COMMENT '행사 관련 홈페이지 링크',
  `place` varchar(256) DEFAULT NULL COMMENT '행사 장소',
  PRIMARY KEY (`event_detail_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='행사 상세 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_detail`
--

LOCK TABLES `event_detail` WRITE;
/*!40000 ALTER TABLE `event_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `login_type` varchar(16) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-03 20:43:00
