-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: gamispace
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `session`
--
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `IDSession` int NOT NULL AUTO_INCREMENT,
  `IDUser` int NOT NULL, 
  `LoginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LogoutTime` datetime DEFAULT NULL,
  PRIMARY KEY (`IDSession`),
  CONSTRAINT `fk_session_user` FOREIGN KEY (`IDUser`) 
    REFERENCES `users` (`IDUser`) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Table structure for table `gameSession`
--
-- Se crea cuando el usuario hace clic en un juego
DROP TABLE IF EXISTS `game_session`;
CREATE TABLE `game_session` (
  `IDGameSession` int NOT NULL AUTO_INCREMENT,
  `IDSession` int NOT NULL,
  `IDGame` int NOT NULL, -- Este es el ID 127 que vemos en el log
  `GameStartTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `GameEndTime` datetime DEFAULT NULL,
  PRIMARY KEY (`IDGameSession`),
  CONSTRAINT `fk_gamesession_session` FOREIGN KEY (`IDSession`) 
    REFERENCES `session` (`IDSession`) ON DELETE CASCADE,
  CONSTRAINT `fk_gamesession_game` FOREIGN KEY (`IDGame`) 
    REFERENCES `games` (`IDGame`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Table structure for table `play`
--
-- Se crea cuando se termina una partida/intento dentro de esa sesión de juego
DROP TABLE IF EXISTS `play`;
CREATE TABLE `play` (
  `IDPlay` int NOT NULL AUTO_INCREMENT,
  `IDGameSession` int NOT NULL,  -- Referencia a la sesión de juego
  `Score` int DEFAULT 0,
  `PlayDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Metadata` json DEFAULT NULL,  -- Para guardar datos extra en el futuro (opcional)
  PRIMARY KEY (`IDPlay`),
  CONSTRAINT `fk_play_gamesession` FOREIGN KEY (`IDGameSession`) REFERENCES `game_session` (`IDGameSession`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `IDGame` int NOT NULL AUTO_INCREMENT,
  `UrlImagen` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Nombre` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PuntuacionMaxima` int NOT NULL,
  `Abierto` tinyint(1) NOT NULL,
  `Visible` tinyint(1) NOT NULL,
  `Disponible` tinyint(1) NOT NULL,
  PRIMARY KEY (`IDGame`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

LOCK TABLES `games` WRITE;
INSERT INTO `games` VALUES 
(127,'url_img_1','Cafeteria',8000,1,1,1),
(109,'url_img_1','Caida de Datos',8000,1,1,1),
(128,'url_img_2','La No Cafeteria',9000,1,1,1);
UNLOCK TABLES;

--
-- Table structure for table `subjects`
-- 

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `IDSubject` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `UrlImgMundo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `UrlImgDentro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Posicion` int NOT NULL,
  `Abierto` tinyint(1) NOT NULL,
  `Visible` tinyint(1) NOT NULL,
  PRIMARY KEY (`IDSubject`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

LOCK TABLES `subjects` WRITE;
INSERT INTO `subjects` VALUES 
(48,'Prueba 1','1u9116483zzh7z','0y4x2248tqdp8x',0,1,1),
(50,'hola','sdasd','asdasd',0,0,1);
UNLOCK TABLES;



--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `IDUser` int NOT NULL AUTO_INCREMENT,
  `Grupo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `TipoUsuario` enum('A','D','T','P') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Contrasena` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`IDUser`)
) ENGINE=InnoDB AUTO_INCREMENT=721 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'A','A','admin','admin'),(2,'P','P','player','player'),(4,'T','T','teacher','teacher'),(5,'D','D','dev','dev'),(562,'P','P','Demo1','Demo1'),(563,'P','P','Demo2','Demo2'),(652,'X7','A','User89','User89'),(653,'X7','P','User90','User90'),(654,'X7','P','User91','User91'),(655,'X7','P','User92','User92'),(656,'X7','P','User93','User93'),(657,'X7','P','User94','User94'),(658,'X7','P','User95','User95'),(659,'X7','P','User96','User96'),(660,'X7','P','User97','User97'),(661,'X7','P','User98','User98'),(662,'X7','P','User99','User99'),(663,'X7','P','User100','User100'),(664,'X7','P','User101','User101'),(665,'X7','P','User102','User102'),(666,'X7','P','User103','User103'),(667,'X7','P','User104','User104'),(668,'X7','P','User105','User105'),(564,'X1','P','User1','User1'),(565,'X1','P','User2','User2'),(566,'X1','P','User3','User3'),(567,'X1','P','User4','User4'),(568,'X1','P','User5','User5'),(569,'X1','P','User6','User6'),(570,'X1','P','User7','User7'),(571,'X1','P','User8','User8'),(572,'X1','P','Demo3','Demo3'),(573,'X1','P','User10','User10'),(574,'X1','P','User11','User11'),(575,'X1','P','User12','User12'),(576,'X1','P','User13','User13'),(577,'X1','P','User14','User14'),(578,'X1','P','User15','User15'),(579,'X1','P','Demo4','Demo4'),(580,'X1','P','Demo5','Demo5'),(581,'X1','P','User18','User18'),(582,'X1','P','User19','User19'),(583,'X1','P','User20','User20'),(584,'X1','P','Demo6','Demo6'),(585,'X2','P','User22','User22'),(586,'X2','P','User23','User23'),(587,'X2','P','User24','User24'),(588,'X2','P','Demo7','Demo7'),(589,'X2','P','User26','User26'),(590,'X2','P','Demo8','Demo8'),(591,'X2','P','User28','User28'),(592,'X2','P','User29','User29'),(593,'X2','P','User30','User30'),(594,'X2','P','User31','User31'),(690,'X3','P','User127','User127'),(691,'X3','P','User128','User128'),(692,'X3','P','User129','User129'),(693,'X3','P','User130','User130'),(694,'X3','P','User131','User131'),(695,'X3','P','User132','User132'),(696,'X3','P','User133','User133'),(697,'X3','P','User134','User134'),(698,'X3','P','User135','User135'),(699,'X3','P','User136','User136'),(700,'X3','P','User137','User137'),(701,'X3','P','User138','User138'),(702,'X3','P','User139','User139'),(703,'X3','P','User140','User140'),(704,'X3','P','User141','User141'),(705,'X3','P','User142','User142'),(706,'X3','P','User143','User143'),(707,'X3','P','User144','User144'),(708,'X3','P','User145','User145'),(709,'X3','P','User146','User146'),(710,'X3','P','User147','User147'),(629,'X5','P','User66','User66'),(630,'X5','P','User67','User67'),(631,'X5','P','User68','User68'),(632,'X5','P','User69','User69'),(633,'X5','P','User70','User70'),(634,'X5','P','User71','User71'),(635,'X5','P','User72','User72'),(636,'X5','P','User73','User73'),(637,'X5','P','User74','User74'),(638,'X5','P','User75','User75'),(639,'X5','P','User76','User76'),(640,'X5','P','User77','User77'),(641,'X5','P','User78','User78'),(642,'X5','P','User79','User79'),(643,'X5','P','User80','User80'),(644,'X5','P','User81','User81'),(645,'X5','P','User82','User82'),(646,'X5','P','User83','User83'),(647,'X5','P','User84','User84'),(648,'X7','P','User85','User85'),(649,'X7','P','User86','User86'),(650,'X7','P','User87','User87'),(651,'X7','P','User88','User88'),(595,'X2','P','User32','User32'),(596,'X2','P','User33','User33'),(597,'X2','P','User34','User34'),(598,'X2','P','Demo9','Demo9'),(599,'X2','P','User36','User36'),(600,'X2','P','User37','User37'),(601,'X2','P','User38','User38'),(602,'X2','P','Demo10','Demo10'),(603,'X2','P','User40','User40'),(604,'X2','P','User41','User41'),(605,'X2','P','User42','User42'),(606,'X4','P','User43','User43'),(607,'X4','P','User44','User44'),(608,'X4','P','User45','User45'),(609,'X4','P','User46','User46'),(610,'X4','P','User47','User47'),(611,'X4','P','User48','User48'),(612,'X4','P','User49','User49'),(613,'X4','P','User50','User50'),(614,'X4','P','User51','User51'),(615,'X4','P','User52','User52'),(616,'X4','P','User53','User53'),(617,'X4','P','User54','User54'),(618,'X4','P','User55','User55'),(619,'X4','P','User56','User56'),(620,'X4','P','User57','User57'),(621,'X4','P','User58','User58'),(622,'X4','P','User59','User59'),(623,'X4','P','User60','User60'),(624,'X4','P','User61','User61'),(625,'X4','P','User62','User62'),(626,'X4','P','User63','User63'),(627,'X5','P','User64','User64'),(628,'X5','P','User65','User65');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `IDContent` int NOT NULL AUTO_INCREMENT,
  `IDSubject` int NOT NULL,
  `IDGame` int NOT NULL,
  PRIMARY KEY (`IDContent`),
  CONSTRAINT `fk_content_mundo` FOREIGN KEY (`IDSubject`) REFERENCES `subjects` (`IDSubject`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_content_minijuego` FOREIGN KEY (`IDGame`) REFERENCES `games` (`IDGame`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Lo dejamos vacío para que puedas probar la vinculación desde el Front
LOCK TABLES `content` WRITE;
UNLOCK TABLES;



--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theme` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `primary_color` varchar(100) DEFAULT NULL,
  `secondary_color` varchar(100) DEFAULT NULL,
  `text_color` varchar(100) DEFAULT NULL,
  `points_icon` varchar(255) DEFAULT NULL,
  `completed_subjects_icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES (1,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-09 09:53:44'),(2,'#070c2a','#151d72','#d2d7e1','','','2025-04-09 10:41:33'),(3,'#070c2a','#721532','#5d80c7','','','2025-04-09 10:41:40'),(4,'#000000','#000000','#c4b717','','','2025-04-09 11:00:20'),(5,'#8c8622','#171e70','#bdc7db','','','2025-04-09 11:00:45'),(6,'#000f64','#511254','#e9ebef','','','2025-04-09 11:53:59'),(7,'#000000','#000000','#1cff00','','','2025-04-09 11:54:18'),(8,'#2a2d3d','#232b84','#d2d7e1','','','2025-04-09 11:57:37'),(9,'#1e2d83','#232b84','#d2d7e1','','','2025-04-09 11:57:41'),(10,'#263797','#232b84','#d2d7e1','','','2025-04-09 11:57:44'),(11,'#263797','#232b84','#d2e0d1','','','2025-04-09 11:57:47'),(12,'#263797','#232b84','#d2e0d1','','','2025-04-09 11:57:47'),(13,'#263797','#232b84','#d2e0d1','','','2025-04-09 11:57:48'),(14,'#263797','#232b84','#73b16e','','','2025-04-09 11:57:50'),(15,'#263797','#232b84','#9fe199','','','2025-04-09 11:57:53'),(16,'#a6b3ff','#ffffff','#000000','','','2025-04-09 11:58:06'),(17,'#3f4c94','#6b75e0','#ccffc8','','','2025-04-09 11:58:27'),(18,'#3f4c94','#6b75e0','#f1e4e4','','','2025-04-09 11:58:39'),(19,'#3f4c94','#6b75e0','#baf4a8','','','2025-04-09 11:58:45'),(20,'#616fbc','#4d5395','#d2d7e1','','','2025-04-09 12:02:58'),(21,'#8228b3','#c476e6','#d2d7e1','','','2025-04-09 12:03:33'),(22,'#468045','#8c297e','#d2d7e1','','','2025-04-09 12:03:48'),(23,'#0f1951','#7a890e','#d2d7e1','','','2025-04-09 12:05:42'),(24,'#0d1a5f','#7a890e','#d2d7e1','','','2025-04-09 12:05:46'),(25,'#5c1853','#0e1346','#d2d7e1','','','2025-04-09 12:08:25'),(26,'#5c1853','#0e1346','#ffffff','','','2025-04-09 12:08:37'),(27,'#293a2b','#0c0f32','#ffffff','','','2025-04-09 12:08:48'),(28,'#57090a','#210810','#ffffff','','','2025-04-09 12:09:07'),(29,'#57090a','#c92d5e','#ffffff','','','2025-04-09 12:09:22'),(30,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-09 12:51:48'),(31,'#343f7c','#0c0d17','#454a56','','','2025-04-09 15:00:22'),(32,'#3d2a33','#e64e83','#e0d1d6','','','2025-04-09 15:00:37'),(33,'#2d3d2a','#e6b84e','#d1e0d1','','','2025-04-09 15:00:48'),(34,'#2a333d','#4ebfe6','#d1e0e0','','','2025-04-09 15:00:55'),(35,'#3d2a30','#e64e87','#e0d1d3','','','2025-04-09 15:01:00'),(36,'#3d382a','#cae64e','#e0dfd1','','','2025-04-09 15:01:04'),(37,'#3d382a','#cae64e','#ffffff','','','2025-04-09 15:01:12'),(38,'#4f5dad','#131419','#1c222f','','','2025-04-11 08:14:25'),(39,'#060c2d','#585a79','#13306a','','','2025-04-11 08:14:44'),(40,'#6b2f31','#cdcdbb','#30539a','','','2025-04-11 08:15:11'),(41,'#6b2f31','#cdcdbb','#ffffff','','','2025-04-11 08:15:15'),(42,'#6b2f31','#545454','#ffffff','','','2025-04-11 08:15:20'),(43,'#ff0009','#545454','#ffffff','','','2025-04-11 08:15:26'),(44,'#470a60','#170760','#d2d7e1','','','2025-04-11 09:01:38'),(45,'#1d286a','#4f2fa5','#d2d7e1','','','2025-04-11 09:02:00'),(46,'#3b8334','#8d3386','#d2d7e1','','','2025-04-11 09:02:15'),(47,'#3b8734','#763b71','#d2d7e1','','','2025-04-11 09:02:23'),(48,'#3e4b95','#202347','#d2d7e1','','','2025-04-11 10:14:16'),(49,'#553ed5','#200a39','#d2d7e1','','','2025-04-11 10:14:52'),(50,'#468d81','#181e57','#f6f9ff','','','2025-04-11 10:15:39'),(51,'#000000','#4f5be5','#d2d7e1','','','2025-04-11 10:34:58'),(52,'#000000','#7c4ee6','#d2d7e1','','','2025-04-11 10:35:22'),(53,'#000000','#4e57e6','#d2d7e1','','','2025-04-11 10:35:27'),(54,'#000000','#1b7e1a','#d2d7e1','','','2025-04-11 10:35:32'),(55,'#000000','#0f5b0e','#d2d7e1','','','2025-04-11 10:35:34'),(56,'#000000','#0e255b','#d2d7e1','','','2025-04-11 10:35:37'),(57,'#000000','#310e5b','#d2d7e1','','','2025-04-11 10:35:40'),(58,'#000000','#5b0e42','#d2d7e1','','','2025-04-11 10:35:43'),(59,'#000000','#5b0e0e','#d2d7e1','','','2025-04-11 10:35:45'),(60,'#000000','#5b490e','#d2d7e1','','','2025-04-11 10:35:48'),(61,'#0026ff','#0c0b15','#d2d7e1','','','2025-04-11 10:36:04'),(62,'#0026ff','#1b153e','#d2d7e1','','','2025-04-11 10:36:08'),(63,'#001484','#1b153e','#d2d7e1','','','2025-04-11 10:36:11'),(64,'#000000','#1f0838','#ced6e6','','','2025-04-11 10:36:34'),(65,'#000000','#ae4ee6','#d2d7e1','','','2025-04-11 10:43:44'),(66,'#000000','#774ee6','#d2d7e1','','','2025-04-11 10:43:48'),(67,'#000000','#3a217f','#d2d7e1','','','2025-04-11 10:43:50'),(68,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-11 10:44:28'),(69,'#2a2d3d','#707496','#d2d7e1','','','2025-04-11 11:34:26'),(70,'#2a2d3d','#7e81a6','#d2d7e1','','','2025-04-11 11:34:36'),(71,'#2b2e3e','#666a93','#fa2b2b','','','2025-04-11 11:35:11'),(72,'#000000','#121ea6','#ffffff','','','2025-04-11 11:35:24'),(73,'#240b4f','#36857d','#d2d7e1','','','2025-04-15 11:11:11'),(74,'#421865','#2aa774','#d2d7e1','','','2025-04-15 11:22:32'),(75,'#421865','#1b6c4b','#d2d7e1','','','2025-04-15 11:22:36'),(76,'#542879','#2b8460','#d2d7e1','','','2025-04-15 11:22:44'),(77,'#3b175a','#2b8460','#d2d7e1','','','2025-04-15 11:22:51'),(78,'#3b175a','#2b8384','#d2d7e1','','','2025-04-15 11:22:55'),(79,'#3b175a','#2b8384','#fffad4','','','2025-04-15 11:23:06'),(80,'#3b175a','#2b8384','#f2f2f2','','','2025-04-15 11:23:09'),(81,'#000000','#000000','#ffffff','','','2025-04-15 11:23:20'),(82,'#2a2d3d','#4f5be5','#ffe800','','','2025-04-15 11:23:54'),(83,'#000000','#000000','#ffe800','','','2025-04-15 11:23:57'),(84,'#a31111','#160d3e','#e7e6da','','','2025-04-15 11:24:30'),(85,'#090f30','#357e51','#d2d7e1','','','2025-04-15 11:25:34'),(86,'#100930','#357e51','#d2d7e1','','','2025-04-15 11:25:44'),(87,'#100930','#357e51','#d2d7e1','','','2025-04-15 11:25:45'),(88,'#160930','#357e51','#d2d7e1','','','2025-04-15 11:25:47'),(89,'#160930','#357e51','#d2d7e1','','','2025-04-15 11:25:48'),(90,'#62449e','#357e51','#d2d7e1','','','2025-04-15 11:25:52'),(91,'#180a34','#357e51','#d2d7e1','','','2025-04-15 11:25:55'),(92,'#a0db69','#96fbff','#0f1c38','','','2025-04-15 11:27:50'),(93,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-15 11:28:32'),(94,'#161046','#257e64','#d2d7e1','','','2025-04-15 11:29:50'),(95,'#780b63','#141950','#3458a0','','','2025-04-15 11:58:14'),(96,'#2a154c','#1d7456','#d2d7e1','','','2025-04-15 11:58:30'),(97,'#1a5e81','#469559','#d2d7e1','','','2025-04-21 10:49:58'),(98,'#1a3c81','#469559','#d2d7e1','','','2025-04-21 10:50:02'),(99,'#273c9d','#258d54','#d2d7e1','','','2025-04-21 11:57:53'),(100,'#1f0b4b','#571061','#00ff01','','','2025-04-21 11:59:46'),(101,'#1f0b4b','#571061','#98ff98','','','2025-04-21 11:59:53'),(102,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-21 12:03:30'),(103,'#2a2d3d','#4f5be5','#8d9ab4','','','2025-04-25 11:06:33'),(104,'#16368e','#2d915f','#d2d7e1','','','2025-04-25 11:37:40'),(105,'#0e24a4','#9b4ee6','#d2d7e1','','','2025-04-25 11:40:19'),(106,'#162ba7','#9b4ee6','#d2d7e1','','','2025-04-25 11:40:23'),(107,'#122ab3','#9b4ee6','#d2d7e1','','','2025-04-25 11:40:26'),(108,'#072ea8','#279461','#d2d7e1','','','2025-04-25 11:42:37'),(109,'#3c1340','#3d9647','#d2d7e1','','','2025-04-25 14:47:35'),(110,'#3c1340','#963d3d','#d2d7e1','','','2025-04-25 14:47:38'),(111,'#11116d','#95963d','#d2d7e1','','','2025-04-25 14:47:52'),(112,'#11116d','#6e963d','#d2d7e1','','','2025-04-25 14:47:55'),(113,'#11116d','#6e963d','#e0d1d1','','','2025-04-25 14:47:58'),(114,'#11116d','#6e963d','#ff0000','','','2025-04-25 14:48:01'),(115,'#11116d','#6e963d','#ffffff','','','2025-04-25 14:48:05'),(116,'#b652a8','#aeae3c','#d2d7e1','','','2025-04-25 14:53:11'),(117,'#b539ae','#9fb500','#d2d7e1','','','2025-04-25 14:53:37'),(118,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-29 20:05:56'),(119,'#4b268c','#b74ee6','#d2d7e1','','','2025-04-29 20:07:42'),(120,'#212156','#b74ee6','#d2d7e1','','','2025-04-29 20:07:54'),(121,'#212156','#6f1e92','#d2d7e1','','','2025-04-29 20:08:01'),(122,'#212156','#6f1e92','#ffffff','','','2025-04-29 20:08:05'),(123,'#112569','#345e2e','#d2d7e1','','','2025-04-29 20:18:59'),(124,'#112569','#5e7e24','#d2d7e1','','','2025-04-29 20:19:06'),(125,'#112569','#506d1d','#d2d7e1','','','2025-04-29 20:19:09'),(126,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-29 20:23:55'),(127,'#1f7330','#aa3030','#ffffff','','','2025-04-29 20:24:44'),(128,'#ad1818','#aba711','#d2d7e1','','','2025-04-29 20:25:16'),(129,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-29 20:26:24'),(130,'#2a3c3d','#854ee6','#d2d7e1','','','2025-04-29 20:26:41'),(131,'#6dbea9','#d8eddf','#3926c0','','','2025-04-29 20:27:17'),(132,'#89c7b7','#d8eddf','#3926c0','','','2025-04-29 20:27:25'),(133,'#9fdac7','#d8eddf','#3926c0','','','2025-04-29 20:27:37'),(134,'#ffffff','#a6a6a7','#000000','','','2025-04-29 20:28:34'),(135,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-04-29 20:29:02'),(136,'#1d0e41','#177f6f','#d2d7e1','','','2025-05-05 10:51:53'),(137,'#0e2841','#28a18e','#d2d7e1','','','2025-05-05 10:52:01'),(138,'#250e41','#2890a1','#d2d7e1','','','2025-05-05 10:52:13'),(139,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-05 11:30:54'),(140,'#091837','#3b7235','#d2d7e1','','','2025-05-05 11:31:23'),(141,'#ffafcc','#a2d2ff','#ffffff','','','2025-05-05 11:46:25'),(142,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-05 11:46:47'),(143,'#a2d2ff','#cdb4db','#ffffff','','','2025-05-05 11:47:41'),(144,'#6d186b','#105e11','#d2d7e1','','','2025-05-05 11:48:16'),(145,'#00002c','#427b4d','#d2d7e1','','','2025-05-05 11:48:38'),(146,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-05 11:53:21'),(147,'#000a43','#427d4b','#d2d7e1','','','2025-05-05 11:53:50'),(148,'#000000','#000000','#c1ff00','','','2025-05-05 15:42:43'),(149,'#0d0234','#197038','#d2d7e1','','','2025-05-05 15:43:37'),(150,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-07 08:29:49'),(151,'#010932','#1f5f1a','#d2d7e1','','','2025-05-07 08:30:33'),(152,'#040d40','#226c35','#d2d7e1','','','2025-05-07 08:31:11'),(153,'#1d0b56','#830dc0','#d2d8e5','','','2025-05-09 12:37:47'),(154,'#1d0b56','#6c0b9d','#d2d8e5','','','2025-05-09 12:37:49'),(155,'#071097','#0e022f','#d2d8e5','','','2025-05-09 12:38:13'),(156,'#071097','#2f0440','#d2d8e5','','','2025-05-09 12:38:18'),(157,'#a463a7','#387d37','#d2d7e1','','','2025-05-09 12:38:58'),(158,'#020721','#0d644b','#d2d7e1','','','2025-05-09 12:39:28'),(159,'#000000','#0d644b','#d2d7e1','','','2025-05-09 12:39:31'),(160,'#000000','#6f0034','#ffffff','','','2025-05-09 12:40:00'),(161,'#a41b1b','#126206','#ffffff','','','2025-05-09 12:40:32'),(162,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-09 12:40:43'),(163,'#040324','#1b5940','#d2d7e1','','','2025-05-09 12:41:08'),(164,'#2d246c','#050942','#f0f5ff','','','2025-05-15 09:30:39'),(165,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-15 09:30:55'),(166,'#01003d','#205349','#e0e5f0','','','2025-05-15 09:31:30'),(167,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-15 10:48:34'),(168,'#010626','#1f5137','#d2d7e1','','','2025-05-15 10:49:08'),(169,'#050924','#1c8155','#d2d7e1','','','2025-05-20 19:13:44'),(170,'#050924','#186445','#d2d7e1','','','2025-05-20 19:13:55'),(171,'#00000e','#237559','#d2d7e1','','','2025-05-21 15:54:30'),(172,'#2a2d3d','#4f5be5','#d2d7e1','','','2025-05-21 16:22:23'),(173,'#000000','#2734c3','#d2d7e1','','','2025-05-21 16:22:39'),(174,'#260248','#10534c','#d2d7e1','','','2025-05-21 21:07:17'),(175,'#260248','#09423c','#d2d7e1','','','2025-05-21 21:07:22'),(176,'#000000','#481467','#d2d7e1','','','2025-05-21 21:09:34'),(177,'#d4d8eb','#7a7da4','#000000','','','2025-05-21 21:10:08'),(178,'#050c32','#3d71b9','#d1d3e0','','','2025-05-21 21:10:53'),(179,'#04083b','#1d6146','#e6ecf6','','','2025-06-06 18:57:27'),(180,'#00001c','#1b653d','#d2d7e1','','','2025-06-12 14:51:10'),(181,'#00001c','#1b653d','#e5e9f0','','','2025-06-12 14:51:18');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 12:33:00
