-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2022 at 06:41 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stock-ease`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `EventList` ()  SELECT * FROM items$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EventsList` ()  SELECT * FROM items$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemsList` ()  SELECT * FROM items$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `email_id`) VALUES
(10, 'palash', 'palash', 'palash@gmail.com'),
(1000, 'amilone', 'amilone', 'abc@gmail.com'),
(1001, 'alimone', 'alimone', 'xyz@gmail.com'),
(1003, 'junaid', '123', 'junaid@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_number` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `allot_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_number`, `section_id`, `product_id`, `product_name`, `allot_size`) VALUES
(1, 115, NULL, '', 20),
(1, 116, 3001, 'Dove Soap', 20),
(1, 117, 3005, 'Ponds Powder', 2),
(2, 115, 3002, 'Loreal Paris Shampoo', 20),
(2, 116, 3001, 'Dove Soap', 20),
(2, 117, 3005, 'Ponds Powder', 2),
(3, 115, NULL, '', 20),
(3, 116, 3001, 'Dove Soap', 20),
(4, 115, NULL, '', 20),
(4, 116, 3001, 'Dove Soap', 20),
(5, 115, NULL, '', 20),
(5, 116, NULL, '', 20),
(6, 115, NULL, '', 20),
(6, 116, NULL, '', 20),
(7, 115, NULL, '', 20),
(7, 116, NULL, '', 20),
(8, 115, NULL, '', 20),
(8, 116, NULL, '', 20),
(9, 115, NULL, '', 20),
(9, 116, NULL, '', 20),
(10, 115, NULL, '', 20),
(10, 116, NULL, '', 20),
(11, 115, NULL, '', 20),
(11, 116, NULL, '', 20),
(12, 115, NULL, '', 20),
(12, 116, NULL, '', 20);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `product_id`, `manager_id`) VALUES
(4006, 3001, 2004),
(4008, 3001, 2004),
(4010, 3002, 2004),
(4011, 3002, 2004),
(4012, 3002, 2004),
(4013, 3001, 2004),
(4014, 3001, 2004),
(4056, 3001, 2004),
(4057, 3001, 2004),
(4058, 3001, 2004),
(4059, 3001, 2004),
(4060, 3001, 2004),
(4061, 3001, 2004),
(4062, 3001, 2004),
(4063, 3001, 2004),
(4064, 3001, 2004),
(4065, 3001, 2004),
(4066, 3001, 2004),
(4067, 3001, 2004),
(4068, 3001, 2004),
(4069, 3001, 2004),
(4070, 3001, 2004),
(4071, 3001, 2004),
(4072, 3001, 2004),
(4073, 3001, 2004),
(4101, 3001, 2004),
(4102, 3001, 2004),
(4103, 3001, 2004),
(4104, 3001, 2004),
(4200, 3005, 2004),
(4202, 3005, 2004);

--
-- Triggers `items`
--
DELIMITER $$
CREATE TRIGGER `deletelog` AFTER DELETE ON `items` FOR EACH ROW insert into logs values (null, 'Item Deleted' , old.product_id , old.manager_id , NOW())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insertlog` AFTER INSERT ON `items` FOR EACH ROW insert into logs values (null, 'Item Inserted' , new.product_id , new.manager_id , NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `lid` int(11) NOT NULL,
  `laction` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  `ldate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`lid`, `laction`, `pid`, `manager_id`, `ldate`) VALUES
(8, 'Item Inserted', 3001, 2004, '2022-02-02 14:04:05'),
(9, 'Item Inserted', 3001, 2004, '2022-02-02 14:04:05'),
(10, 'Item Deleted', 3001, 2004, '2022-02-02 14:33:06'),
(11, 'Item Inserted', 3002, 2004, '2022-02-02 20:46:14'),
(12, 'Item Inserted', 3002, 2004, '2022-02-02 20:46:14'),
(13, 'Item Inserted', 3002, 2004, '2022-02-02 20:46:14'),
(14, 'Item Inserted', 3001, 2004, '2022-02-03 14:04:23'),
(15, 'Item Inserted', 3001, 2004, '2022-02-03 14:04:23'),
(16, 'Item Deleted', 3001, 2004, '2022-02-04 21:24:23'),
(17, 'Item Inserted', 3001, 2004, '2022-02-05 12:13:30'),
(18, 'Item Inserted', 3001, 2004, '2022-02-05 12:13:30'),
(19, 'Item Inserted', 3001, 2004, '2022-02-05 12:13:30'),
(20, 'Item Inserted', 3001, 2004, '2022-02-05 12:13:30'),
(21, 'Item Deleted', 3001, 2004, '2022-02-05 12:15:35'),
(22, 'Item Deleted', 3001, 2004, '2022-02-05 12:15:36'),
(23, 'Item Deleted', 3001, 2004, '2022-02-05 12:15:36'),
(24, 'Item Deleted', 3001, 2004, '2022-02-05 12:15:36'),
(25, 'Item Inserted', 3001, 2004, '2022-02-05 12:16:11'),
(26, 'Item Inserted', 3001, 2004, '2022-02-05 12:16:11'),
(27, 'Item Inserted', 3001, 2004, '2022-02-05 12:16:11'),
(28, 'Item Inserted', 3001, 2004, '2022-02-05 12:16:11'),
(29, 'Item Deleted', 3001, 2004, '2022-02-05 12:18:02'),
(30, 'Item Deleted', 3001, 2004, '2022-02-05 12:18:02'),
(31, 'Item Deleted', 3001, 2004, '2022-02-05 12:18:02'),
(32, 'Item Deleted', 3001, 2004, '2022-02-05 12:18:02'),
(33, 'Item Inserted', 3001, 2004, '2022-02-05 12:19:27'),
(34, 'Item Inserted', 3001, 2004, '2022-02-05 12:19:27'),
(35, 'Item Inserted', 3001, 2004, '2022-02-05 12:19:27'),
(36, 'Item Inserted', 3001, 2004, '2022-02-05 12:19:27'),
(37, 'Item Deleted', 3001, 2004, '2022-02-05 12:20:20'),
(38, 'Item Deleted', 3001, 2004, '2022-02-05 12:20:20'),
(39, 'Item Deleted', 3001, 2004, '2022-02-05 12:20:20'),
(40, 'Item Deleted', 3001, 2004, '2022-02-05 12:20:20'),
(41, 'Item Inserted', 3001, 2004, '2022-02-05 12:20:43'),
(42, 'Item Inserted', 3001, 2004, '2022-02-05 12:20:43'),
(43, 'Item Inserted', 3001, 2004, '2022-02-05 12:20:43'),
(44, 'Item Inserted', 3001, 2004, '2022-02-05 12:20:43'),
(45, 'Item Inserted', 3001, 2004, '2022-02-05 12:22:33'),
(46, 'Item Inserted', 3001, 2004, '2022-02-05 12:22:33'),
(47, 'Item Inserted', 3001, 2004, '2022-02-05 12:26:36'),
(48, 'Item Inserted', 3001, 2004, '2022-02-05 12:26:36'),
(49, 'Item Inserted', 3001, 2004, '2022-02-05 12:27:15'),
(50, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(51, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(52, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(53, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(54, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(55, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(56, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(57, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(58, 'Item Deleted', 3001, 2004, '2022-02-05 12:28:22'),
(59, 'Item Inserted', 3001, 2004, '2022-02-05 12:29:06'),
(60, 'Item Inserted', 3001, 2004, '2022-02-05 12:29:06'),
(61, 'Item Inserted', 3001, 2004, '2022-02-05 12:30:13'),
(62, 'Item Inserted', 3001, 2004, '2022-02-05 12:30:13'),
(63, 'Item Inserted', 3001, 2004, '2022-02-05 12:30:43'),
(64, 'Item Inserted', 3001, 2004, '2022-02-05 12:30:43'),
(65, 'Item Inserted', 3001, 2004, '2022-02-05 12:31:15'),
(66, 'Item Inserted', 3001, 2004, '2022-02-05 12:31:15'),
(67, 'Item Inserted', 3001, 2004, '2022-02-05 12:33:52'),
(68, 'Item Inserted', 3001, 2004, '2022-02-05 12:33:52'),
(69, 'Item Inserted', 3001, 2004, '2022-02-05 12:35:23'),
(70, 'Item Inserted', 3001, 2004, '2022-02-05 12:35:23'),
(71, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(72, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(73, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(74, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(75, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(76, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(77, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(78, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(79, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(80, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(81, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(82, 'Item Deleted', 3001, 2004, '2022-02-05 12:39:42'),
(83, 'Item Inserted', 3001, 2004, '2022-02-05 12:40:00'),
(84, 'Item Inserted', 3001, 2004, '2022-02-05 12:40:00'),
(85, 'Item Inserted', 3001, 2004, '2022-02-05 12:40:48'),
(86, 'Item Inserted', 3001, 2004, '2022-02-05 12:40:48'),
(87, 'Item Deleted', 3001, 2004, '2022-02-05 12:42:33'),
(88, 'Item Deleted', 3001, 2004, '2022-02-05 12:42:33'),
(89, 'Item Deleted', 3001, 2004, '2022-02-05 12:42:33'),
(90, 'Item Deleted', 3001, 2004, '2022-02-05 12:42:33'),
(91, 'Item Inserted', 3001, 2004, '2022-02-05 12:42:52'),
(92, 'Item Inserted', 3001, 2004, '2022-02-05 12:42:52'),
(93, 'Item Deleted', 3001, 2004, '2022-02-05 12:44:11'),
(94, 'Item Deleted', 3001, 2004, '2022-02-05 12:44:11'),
(95, 'Item Inserted', 3001, 2004, '2022-02-05 12:44:30'),
(96, 'Item Inserted', 3001, 2004, '2022-02-05 12:44:30'),
(97, 'Item Deleted', 3001, 2004, '2022-02-05 12:48:50'),
(98, 'Item Deleted', 3001, 2004, '2022-02-05 12:48:50'),
(99, 'Item Inserted', 3001, 2004, '2022-02-05 12:49:13'),
(100, 'Item Inserted', 3001, 2004, '2022-02-05 12:49:13'),
(101, 'Item Inserted', 3001, 2004, '2022-02-05 12:53:42'),
(102, 'Item Inserted', 3001, 2004, '2022-02-05 12:53:42'),
(103, 'Item Inserted', 3001, 2004, '2022-02-05 12:55:26'),
(104, 'Item Inserted', 3001, 2004, '2022-02-05 12:55:26'),
(105, 'Item Inserted', 3001, 2004, '2022-02-05 13:35:49'),
(106, 'Item Inserted', 3001, 2004, '2022-02-05 13:35:49'),
(107, 'Item Inserted', 3001, 2004, '2022-02-05 13:36:50'),
(108, 'Item Inserted', 3001, 2004, '2022-02-05 13:36:50'),
(109, 'Item Inserted', 3001, 2004, '2022-02-05 13:37:51'),
(110, 'Item Inserted', 3001, 2004, '2022-02-05 13:37:51'),
(111, 'Item Inserted', 3001, 2004, '2022-02-05 13:49:19'),
(112, 'Item Inserted', 3001, 2004, '2022-02-05 13:49:19'),
(113, 'Item Inserted', 3001, 2004, '2022-02-05 13:49:19'),
(114, 'Item Inserted', 3001, 2004, '2022-02-05 13:49:19'),
(115, 'Item Inserted', 3001, 2004, '2022-02-05 21:02:43'),
(116, 'Item Inserted', 3001, 2004, '2022-02-05 21:02:43'),
(117, 'Item Inserted', 3001, 2004, '2022-02-05 21:02:43'),
(118, 'Item Inserted', 3001, 2004, '2022-02-05 21:02:43'),
(119, 'Item Inserted', 3001, 2004, '2022-02-05 21:02:43'),
(120, 'Item Inserted', 3001, 2004, '2022-02-05 21:08:04'),
(121, 'Item Inserted', 3001, 2004, '2022-02-05 21:08:04'),
(122, 'Item Inserted', 3001, 2004, '2022-02-05 21:08:04'),
(123, 'Item Inserted', 3001, 2004, '2022-02-05 21:08:04'),
(124, 'Item Inserted', 3001, 2004, '2022-02-05 21:08:04'),
(125, 'Item Inserted', 3001, 2004, '2022-02-05 21:11:55'),
(126, 'Item Inserted', 3001, 2004, '2022-02-05 21:11:55'),
(127, 'Item Inserted', 3001, 2004, '2022-02-05 21:11:55'),
(128, 'Item Inserted', 3001, 2004, '2022-02-05 21:11:55'),
(129, 'Item Inserted', 3001, 2004, '2022-02-06 17:48:11'),
(130, 'Item Inserted', 3001, 2004, '2022-02-06 17:48:11'),
(131, 'Item Inserted', 3001, 2004, '2022-02-06 17:53:23'),
(132, 'Item Inserted', 3001, 2004, '2022-02-06 17:53:23'),
(133, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(134, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(135, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(136, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(137, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(138, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(139, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(140, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(141, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(142, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(143, 'Item Inserted', 3001, 2004, '2022-02-06 18:39:41'),
(144, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:35'),
(145, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(146, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(147, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(148, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(149, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(150, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(151, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(152, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(153, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(154, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(155, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(156, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(157, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(158, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(159, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(160, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(161, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(162, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(163, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(164, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(165, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(166, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(167, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(168, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:36'),
(169, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:45'),
(170, 'Item Deleted', 3001, 2004, '2022-02-06 18:45:45'),
(171, 'Item Inserted', 3001, 2004, '2022-02-06 18:47:04'),
(172, 'Item Inserted', 3001, 2004, '2022-02-06 18:47:04'),
(173, 'Item Inserted', 3001, 2004, '2022-02-06 18:47:04'),
(174, 'Item Inserted', 3001, 2004, '2022-02-06 18:47:04'),
(175, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(176, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(177, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(178, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(179, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(180, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(181, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(182, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(183, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(184, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(185, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(186, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(187, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(188, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(189, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(190, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(191, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(192, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(193, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(194, 'Item Inserted', 3001, 2004, '2022-02-06 18:50:47'),
(195, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(196, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(197, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(198, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(199, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(200, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(201, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(202, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(203, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(204, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(205, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(206, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(207, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(208, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(209, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(210, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(211, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(212, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(213, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(214, 'Item Deleted', 3001, 2004, '2022-02-06 18:54:54'),
(215, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(216, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(217, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(218, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(219, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(220, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(221, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(222, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(223, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(224, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(225, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(226, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(227, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(228, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(229, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(230, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(231, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(232, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(233, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(234, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(235, 'Item Inserted', 3001, 2004, '2022-02-06 18:58:31'),
(236, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(237, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(238, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(239, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(240, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(241, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(242, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(243, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(244, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(245, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(246, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(247, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(248, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(249, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(250, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(251, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(252, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(253, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(254, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(255, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(256, 'Item Deleted', 3001, 2004, '2022-02-06 19:00:20'),
(257, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(258, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(259, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(260, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(261, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(262, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(263, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(264, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(265, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(266, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(267, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(268, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(269, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(270, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(271, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(272, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(273, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(274, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(275, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(276, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(277, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(278, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(279, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(280, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(281, 'Item Inserted', 3001, 2004, '2022-02-06 19:16:19'),
(282, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:14'),
(283, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:14'),
(284, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:14'),
(285, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:14'),
(286, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(287, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(288, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(289, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(290, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(291, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(292, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(293, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:31'),
(294, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(295, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(296, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(297, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(298, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(299, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(300, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(301, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(302, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(303, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(304, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(305, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(306, 'Item Deleted', 3001, 2004, '2022-02-06 19:18:32'),
(307, 'Item Inserted', 3005, 2004, '2022-02-06 19:32:04'),
(308, 'Item Inserted', 3005, 2004, '2022-02-06 19:32:04'),
(309, 'Item Inserted', 3005, 2004, '2022-02-06 19:32:04'),
(310, 'Item Inserted', 3005, 2004, '2022-02-06 19:32:04'),
(311, 'Item Inserted', 3005, 2004, '2022-02-06 19:47:11'),
(312, 'Item Deleted', 3005, 2004, '2022-02-06 19:50:13'),
(313, 'Item Deleted', 3005, 2004, '2022-02-06 19:50:52'),
(314, 'Item Deleted', 3005, 2004, '2022-02-06 19:50:52'),
(315, 'Item Deleted', 3005, 2004, '2022-02-06 19:50:52'),
(316, 'Item Inserted', 3005, 2004, '2022-02-06 19:51:59'),
(317, 'Item Inserted', 3005, 2004, '2022-02-06 19:52:00'),
(318, 'Item Inserted', 3005, 2004, '2022-02-06 19:52:00'),
(319, 'Item Deleted', 3005, 2004, '2022-02-06 19:54:07'),
(320, 'Item Deleted', 3005, 2004, '2022-02-06 19:54:07'),
(321, 'Item Deleted', 3005, 2004, '2022-02-06 19:54:07'),
(322, 'Item Inserted', 3005, 2004, '2022-02-06 19:55:01'),
(323, 'Item Inserted', 3005, 2004, '2022-02-06 19:55:01'),
(324, 'Item Inserted', 3005, 2004, '2022-02-06 19:55:01'),
(325, 'Item Deleted', 3005, 2004, '2022-02-06 20:24:32'),
(326, 'Item Deleted', 3005, 2004, '2022-02-06 20:24:32'),
(327, 'Item Deleted', 3005, 2004, '2022-02-06 20:24:32'),
(328, 'Item Inserted', 3005, 2004, '2022-02-06 20:25:18'),
(329, 'Item Inserted', 3005, 2004, '2022-02-06 20:25:18'),
(330, 'Item Inserted', 3005, 2004, '2022-02-06 20:25:18'),
(331, 'Item Deleted', 3005, 2004, '2022-02-06 20:27:56'),
(332, 'Item Deleted', 3005, 2004, '2022-02-06 20:27:56'),
(333, 'Item Deleted', 3005, 2004, '2022-02-06 20:27:56'),
(334, 'Item Inserted', 3005, 2004, '2022-02-06 20:28:47'),
(335, 'Item Inserted', 3005, 2004, '2022-02-06 20:28:47'),
(336, 'Item Inserted', 3005, 2004, '2022-02-06 20:28:47'),
(337, 'Item Deleted', 3005, 2004, '2022-02-06 20:33:40'),
(338, 'Item Deleted', 3005, 2004, '2022-02-06 20:33:40'),
(339, 'Item Deleted', 3005, 2004, '2022-02-06 20:33:40'),
(340, 'Item Deleted', 3005, 2004, '2022-02-06 20:33:40'),
(341, 'Item Inserted', 3005, 2004, '2022-02-06 20:35:32'),
(342, 'Item Deleted', 3005, 2004, '2022-02-06 20:39:30'),
(343, 'Item Inserted', 3005, 2004, '2022-02-06 20:42:03'),
(344, 'Item Deleted', 3005, 2004, '2022-02-06 20:42:53'),
(345, 'Item Inserted', 3005, 2004, '2022-02-06 20:43:13'),
(346, 'Item Deleted', 3005, 2004, '2022-02-06 20:44:15'),
(347, 'Item Inserted', 3005, 2004, '2022-02-06 20:44:44'),
(348, 'Item Deleted', 3005, 2004, '2022-02-06 20:45:41'),
(349, 'Item Inserted', 3005, 2004, '2022-02-06 20:48:57'),
(350, 'Item Inserted', 3005, 2004, '2022-02-06 20:48:57'),
(351, 'Item Inserted', 3005, 2004, '2022-02-06 20:48:57'),
(352, 'Item Inserted', 3005, 2004, '2022-02-06 20:49:34'),
(353, 'Item Deleted', 3005, 2004, '2022-02-06 21:17:29'),
(354, 'Item Deleted', 3005, 2004, '2022-02-06 21:17:29'),
(355, 'Item Deleted', 3005, 2004, '2022-02-06 21:17:29'),
(356, 'Item Deleted', 3005, 2004, '2022-02-06 21:17:29'),
(357, 'Item Inserted', 3005, 2004, '2022-02-06 21:18:08'),
(358, 'Item Inserted', 3005, 2004, '2022-02-06 21:18:08'),
(359, 'Item Deleted', 3005, 2004, '2022-02-06 21:20:24'),
(360, 'Item Deleted', 3005, 2004, '2022-02-06 21:20:24'),
(361, 'Item Inserted', 3005, 2004, '2022-02-06 21:26:51'),
(362, 'Item Inserted', 3005, 2004, '2022-02-06 21:26:51'),
(363, 'Item Deleted', 3005, 2004, '2022-02-06 21:35:09'),
(364, 'Item Deleted', 3005, 2004, '2022-02-06 21:35:09'),
(365, 'Item Inserted', 3005, 2004, '2022-02-06 21:36:27'),
(366, 'Item Inserted', 3005, 2004, '2022-02-06 21:36:27'),
(367, 'Item Inserted', 3005, 2004, '2022-02-07 10:06:26'),
(368, 'Item Inserted', 3005, 2004, '2022-02-07 10:08:06'),
(369, 'Item Inserted', 3005, 2004, '2022-02-07 10:08:06'),
(370, 'Item Deleted', 3005, 2004, '2022-02-07 10:09:35'),
(371, 'Item Deleted', 3005, 2004, '2022-02-07 10:11:30'),
(372, 'Item Deleted', 3005, 2004, '2022-02-07 10:12:10'),
(373, 'Item Inserted', 3005, 2004, '2022-02-07 10:12:52'),
(374, 'Item Inserted', 3005, 2004, '2022-02-07 10:12:52'),
(375, 'Item Deleted', 3005, 2004, '2022-02-07 10:24:05'),
(376, 'Item Deleted', 3005, 2004, '2022-02-07 10:24:05'),
(377, 'Item Inserted', 3005, 2004, '2022-02-07 10:24:25'),
(378, 'Item Inserted', 3005, 2004, '2022-02-07 10:24:25'),
(379, 'Item Deleted', 3005, 2004, '2022-02-07 10:26:03'),
(380, 'Item Deleted', 3005, 2004, '2022-02-07 10:26:03'),
(381, 'Item Inserted', 3005, 2004, '2022-02-07 10:29:13'),
(382, 'Item Inserted', 3005, 2004, '2022-02-07 10:29:14'),
(383, 'Item Deleted', 3005, 2004, '2022-02-07 10:33:53'),
(384, 'Item Deleted', 3005, 2004, '2022-02-07 10:33:53'),
(385, 'Item Inserted', 3005, 2004, '2022-02-07 10:34:17'),
(386, 'Item Inserted', 3005, 2004, '2022-02-07 10:34:17'),
(387, 'Item Deleted', 3005, 2004, '2022-02-07 10:39:28'),
(388, 'Item Deleted', 3005, 2004, '2022-02-07 10:39:28'),
(389, 'Item Inserted', 3005, 2004, '2022-02-07 10:39:49'),
(390, 'Item Inserted', 3005, 2004, '2022-02-07 10:39:49'),
(391, 'Item Deleted', 3005, 2004, '2022-02-07 10:47:28'),
(392, 'Item Deleted', 3005, 2004, '2022-02-07 10:47:28'),
(393, 'Item Inserted', 3005, 2004, '2022-02-07 10:47:49'),
(394, 'Item Inserted', 3005, 2004, '2022-02-07 10:47:49'),
(395, 'Item Deleted', 3005, 2004, '2022-02-07 10:53:09'),
(396, 'Item Deleted', 3005, 2004, '2022-02-07 10:53:09'),
(397, 'Item Inserted', 3005, 2004, '2022-02-07 10:53:24'),
(398, 'Item Inserted', 3005, 2004, '2022-02-07 10:53:24'),
(399, 'Item Deleted', 3005, 2004, '2022-02-07 10:54:29'),
(400, 'Item Deleted', 3005, 2004, '2022-02-07 10:54:29'),
(401, 'Item Inserted', 3005, 2004, '2022-02-07 10:54:43'),
(402, 'Item Inserted', 3005, 2004, '2022-02-07 10:54:43'),
(403, 'Item Deleted', 3005, 2004, '2022-02-07 11:05:54'),
(404, 'Item Deleted', 3005, 2004, '2022-02-07 11:05:54');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email_id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `warehouse_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `name`, `username`, `password`, `email_id`, `warehouse_id`) VALUES
(2003, 'palash', 'palash', 'palash', 'palash@email.com', 1003),
(2004, 'rahul', 'rahul', 'rahul', 'rahul@email.com', 1000),
(2008, 'Aaron Pais', 'aaron', 'aaron', 'aaron@email.com', 1000),
(2010, 'Navya', 'navya', 'navya', 'navya@email.com', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) CHARACTER SET utf8 NOT NULL,
  `warehouse_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `type`, `warehouse_id`) VALUES
(3001, 'Dove Soap', 'Day Care', 1000),
(3002, 'Loreal Paris Shampoo', 'Cosmetics', 1000),
(3003, 'Loreal Paris Perfume', 'Cosmetics', 1000),
(3004, 'Huda Beauty Foundation', 'Cosmetics', 1000),
(3005, 'Ponds Powder', 'Skin Care', 1000),
(3006, 'Garnier', 'Skin Care', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `product_type` varchar(50) NOT NULL,
  `cat_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `name`, `warehouse_id`, `product_type`, `cat_count`) VALUES
(115, 'A', 1000, 'Cosmetics', 12),
(116, 'B', 1000, 'Day Care', 12),
(117, 'C', 1000, 'Skin Care', 2);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `cat_number` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`cat_number`, `section_id`, `item_id`) VALUES
(1, 116, 4006),
(1, 116, 4008),
(1, 116, 4056),
(1, 116, 4057),
(1, 116, 4058),
(1, 116, 4059),
(1, 116, 4060),
(1, 116, 4061),
(1, 116, 4062),
(1, 116, 4063),
(1, 116, 4064),
(1, 116, 4065),
(1, 116, 4066),
(1, 116, 4067),
(1, 116, 4068),
(1, 116, 4069),
(1, 116, 4070),
(1, 116, 4071),
(1, 117, 4200),
(2, 115, 4010),
(2, 115, 4011),
(2, 115, 4012),
(2, 116, 4072),
(2, 116, 4073),
(2, 117, 4202),
(3, 116, 4013),
(3, 116, 4014),
(4, 116, 4101),
(4, 116, 4102),
(4, 116, 4103),
(4, 116, 4104);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`id`, `location`, `admin_id`) VALUES
(1000, 'Mangalore', 1000),
(1003, 'Moodbidri', 1001),
(1004, 'Mulki', 1003);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_number`,`section_id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `manager_id` (`manager_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `manager_id` (`manager_id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `warehouse_id` (`warehouse_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`type`),
  ADD KEY `warehouse_id` (`warehouse_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`warehouse_id`),
  ADD KEY `warehouse_id` (`warehouse_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`cat_number`,`section_id`,`item_id`),
  ADD UNIQUE KEY `item_id_2` (`item_id`),
  ADD KEY `section_id` (`section_id`,`cat_number`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_id_2` (`admin_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1004;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4221;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=405;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2011;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3007;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`cat_number`,`section_id`) REFERENCES `category` (`category_number`, `section_id`),
  ADD CONSTRAINT `stores_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `warehouse_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
