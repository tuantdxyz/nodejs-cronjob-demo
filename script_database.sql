-- Database mariadb 10.5.16
CREATE DATABASE `proxy_lab` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- proxy_lab.Persons definition
CREATE TABLE `Persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `actived` tinyint(1) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `updated_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;