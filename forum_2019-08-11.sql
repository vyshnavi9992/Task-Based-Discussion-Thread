# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.23)
# Database: forum
# Generation Time: 2019-08-11 11:57:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
  `answerid` int(11) NOT NULL DEFAULT '0',
  `description` varchar(450) DEFAULT NULL,
  `upvote` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `taskid` int(11) DEFAULT NULL,
  PRIMARY KEY (`answerid`),
  KEY `id` (`id`),
  KEY `taskid` (`taskid`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`taskid`) REFERENCES `task` (`taskid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;

INSERT INTO `answer` (`answerid`, `description`, `upvote`, `id`, `taskid`)
VALUES
	(1,'use crud operations',NULL,1014,2);

/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `tagname` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`tagname`)
VALUES
	('nodejs'),
	('api'),
	('angular'),
	('C'),
	('python'),
	('C++'),
	('JAVA');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `taskid` int(11) NOT NULL DEFAULT '0',
  `description` varchar(150) DEFAULT NULL,
  `keyword` varchar(20) DEFAULT NULL,
  `taskdate` date DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`taskid`),
  KEY `id` (`id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;

INSERT INTO `task` (`taskid`, `description`, `keyword`, `taskdate`, `id`, `name`)
VALUES
	(1,'how to connect to mysql in node js?','nodejs,mysql','2019-07-10',101,NULL),
	(2,'how to create api?','api',NULL,NULL,'shreya');

/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `phoneno` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `phoneno`, `email`, `password`)
VALUES
	(101,'johnny',984805,'johnny@gmail.com','johnny123'),
	(102,'alex',798112,'alex@gmail.com','alex123'),
	(103,'sam',245178,'samyet@gmail.com','sam892'),
	(1002,'vyshnavi',245178,'vyshnavi9992@gmail.com','kamballa'),
	(1003,'sam',245178,'samyet@gmail.com','sam892'),
	(1004,'jake',245178,'jake@gmail.com','sam892'),
	(1005,'swathi',NULL,'swathireddy@gmail.com','swathi000'),
	(1006,'ricky',NULL,'ricky@gmail.com','ricky345'),
	(1007,'ricky',NULL,'ricky@gmail.com','ricky345'),
	(1008,'ricky',NULL,'ricky@gmail.com','ricky345'),
	(1009,'ricky',NULL,'ricky@gmail.com','ricky345'),
	(1010,'ricky',NULL,'ricky@gmail.com','ricky345'),
	(1011,'ricky21',NULL,'ricky515@gmail.com','ricky515'),
	(1012,'shreya',NULL,'shreya@gmail.com','shreya'),
	(1013,'shreya123',NULL,'shreya123@gmail.com','shreya123'),
	(1014,'shreya',NULL,'shreya@gmail.com','shreya'),
	(1015,'shre',NULL,'shre@gmail.com','shre'),
	(1016,'shre123',NULL,'shre123@gmail.com','shre123'),
	(1018,'ricky',NULL,'ricky@gmail.com','ricky'),
	(1020,'shravya',NULL,'shravya@gmail.com','shravya'),
	(1021,'sandy',NULL,'sandy@gmail.com','sandy'),
	(1022,'test6',NULL,'test@enlume.com','Test@123'),
	(1023,'sully',NULL,'sully@gmail.com','sully'),
	(1025,'Enlume',NULL,'enlume@enlume.com','Enlume@123');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
