-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2020 at 08:34 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpinfluence`
--

-- --------------------------------------------------------

--
-- Table structure for table `connection`
--

CREATE TABLE `connection` (
  `id1` int(12) NOT NULL,
  `id2` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `connection`
--

INSERT INTO `connection` (`id1`, `id2`) VALUES
(17, 16),
(18, 16);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id1` int(11) NOT NULL,
  `id2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id1`, `id2`) VALUES
(0, 18);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_to` int(11) NOT NULL,
  `user_from` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `message` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_to`, `user_from`, `time`, `message`) VALUES
(17, 17, 18, '0000-00-00 00:00:00', 'domo'),
(18, 17, 18, '0000-00-00 00:00:00', 's'),
(19, 17, 18, '0000-00-00 00:00:00', 'yr mei soch raha tha aaisa rtaia'),
(20, 17, 18, '0000-00-00 00:00:00', 'a'),
(21, 17, 18, '0000-00-00 00:00:00', 'a'),
(22, 17, 18, '0000-00-00 00:00:00', 'a'),
(23, 17, 18, '0000-00-00 00:00:00', ''),
(24, 17, 18, '0000-00-00 00:00:00', 'a'),
(25, 17, 18, '0000-00-00 00:00:00', 'aa'),
(26, 17, 18, '0000-00-00 00:00:00', 'a'),
(27, 17, 18, '0000-00-00 00:00:00', 'aa'),
(28, 0, 17, '0000-00-00 00:00:00', 'a'),
(29, 18, 17, '0000-00-00 00:00:00', 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(12) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `followers` int(12) NOT NULL,
  `following` int(12) NOT NULL,
  `posts` int(12) NOT NULL,
  `connections` longtext NOT NULL,
  `profilepic` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `password`, `email`, `handle`, `platform`, `followers`, `following`, `posts`, `connections`, `profilepic`) VALUES
(16, 'zaeem', 'd232ed0cb5381e3bc95819155f90cd8c', 'zaeem234456@gmail.com', '@kendalljenner', 'instagram', 333333, 0, 22222, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbFrS_FnU2doHo6yKO8Tu6IMQnYbL2ITBtdg&usqp=CAU'),
(17, 'ssss', 'd232ed0cb5381e3bc95819155f90cd8c', 'a@gmail.com', '@caradelevingne', 'instagram', 1111111, 0, 222222, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9iI3p2tq3LG7NCYNluFCklwlW8KiBqTSQlQ&usqp=CAU'),
(18, 'root', 'd232ed0cb5381e3bc95819155f90cd8c', 'zzzz@gmail.com', '@handle', 'instagram', 333333, 0, 123, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDt2j0dI_Fhiu9OfyRCBdzpBVQWkXvhxNvIA&usqp=CAU');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connection`
--
ALTER TABLE `connection`
  ADD PRIMARY KEY (`id1`,`id2`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
