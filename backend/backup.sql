-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.5.6-MariaDB-log - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for billing_resto
CREATE DATABASE IF NOT EXISTS `billing_resto` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `billing_resto`;

-- Dumping structure for table billing_resto.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.customers: ~3 rows (approximately)
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT IGNORE INTO `customers` (`id`, `name`, `email`, `phone`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'vani', 'vani@email.com', '192839819023', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'vani dongs', 'vani.villlll9999@gmail.com', '12882822', '2021-10-10 21:46:27', '2021-10-10 21:46:27', NULL),
	(3, 'vani', 'vaniajshjdhas@email.com', '1823871823', '2021-10-10 23:21:07', '2021-10-10 23:21:07', NULL),
	(4, 'vandi', 'vani.emute@gmail.com', '12882822122', '2021-10-10 23:56:53', '2021-10-10 23:56:53', NULL),
	(5, 'bajuri', 'bajuri@email.com', '0812737123', '2021-10-24 22:11:17', '2021-10-24 22:11:17', NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

-- Dumping structure for table billing_resto.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.menu: ~2 rows (approximately)
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT IGNORE INTO `menu` (`id`, `name`, `description`, `price`) VALUES
	(1, 'nasi padang', 'asdasdasdas', 100000),
	(2, 'mi ayam baso', 'asdasdasd', 20000);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Dumping structure for table billing_resto.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `booking_time` datetime NOT NULL,
  `table_id` int(11) NOT NULL,
  `grandtotal` decimal(10,0) NOT NULL DEFAULT 0,
  `status` char(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `FK_orders_tables` (`table_id`),
  KEY `FK_orders_users` (`user_id`),
  CONSTRAINT `FK_orders_tables` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`),
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.orders: ~0 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT IGNORE INTO `orders` (`id`, `customer_id`, `booking_time`, `table_id`, `grandtotal`, `status`, `created_at`, `updated_at`, `user_id`) VALUES
	(1, 1, '0000-00-00 00:00:00', 1, 120000, 'pending', '2021-09-18 00:20:40', '2021-09-18 00:20:42', 1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table billing_resto.orders_menu
CREATE TABLE IF NOT EXISTS `orders_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` int(11) NOT NULL DEFAULT 1,
  `order_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__orders` (`order_id`),
  KEY `FK__menu` (`menu_id`),
  CONSTRAINT `FK__menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`),
  CONSTRAINT `FK__orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.orders_menu: ~2 rows (approximately)
/*!40000 ALTER TABLE `orders_menu` DISABLE KEYS */;
INSERT IGNORE INTO `orders_menu` (`id`, `qty`, `order_id`, `menu_id`) VALUES
	(1, 1, 1, 2),
	(2, 1, 1, 1);
/*!40000 ALTER TABLE `orders_menu` ENABLE KEYS */;

-- Dumping structure for table billing_resto.orders_table
CREATE TABLE IF NOT EXISTS `orders_table` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_table_orders` (`order_id`),
  KEY `FK_orders_table_tables` (`table_id`),
  CONSTRAINT `FK_orders_table_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK_orders_table_tables` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.orders_table: ~0 rows (approximately)
/*!40000 ALTER TABLE `orders_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_table` ENABLE KEYS */;

-- Dumping structure for table billing_resto.tables
CREATE TABLE IF NOT EXISTS `tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_chairs` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.tables: ~0 rows (approximately)
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT IGNORE INTO `tables` (`id`, `total_chairs`) VALUES
	(1, 9),
	(4, 4),
	(5, 8);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;

-- Dumping structure for table billing_resto.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table billing_resto.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
	(1, 'vani users', 'asdasdads', 'asdasdas', 'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
