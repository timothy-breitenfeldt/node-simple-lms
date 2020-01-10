-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2020 at 08:14 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simple-lms`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertBook` (`titleValue` VARCHAR(255), `authorIdValue` INT(10))  begin
DECLARE lbid INT DEFAULT 0;
insert into book (title, authorId) values(titleValue, authorIdValue);
select bookId from book where title=titleValue and authorId=authorIdValue;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `authorId` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`authorId`, `name`) VALUES
(1, 'J.K. Rolling'),
(2, 'Miles Cameron'),
(3, 'Robert Jorden'),
(4, 'George Martin'),
(6, 'Timothy Breitenfeldt tester'),
(7, 'tim 1'),
(8, 'some author name'),
(9, 'some author name123'),
(10, 'some author name1234'),
(11, 'some 5325'),
(12, 'some 55325'),
(13, 'some 55324325'),
(14, 'some 55324f325'),
(15, 'some 5532ws325'),
(16, 'some 5532waw325');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `bookId` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `authorId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`bookId`, `title`, `authorId`) VALUES
(1, 'Harry Potter and the Chamber of Secrets', 1),
(2, 'Harry Potter and the Goblet of Fire', 1),
(3, 'Dragon Slayer', 2),
(4, 'Knight of the Silver Circle', 2),
(5, 'The Wheel of Time', 3),
(6, 'The Heart of Winter', 3),
(7, 'Game of Thrones', 4),
(8, 'The Dance of Dragons', 4),
(9, 'my test book', 4),
(10, 'my test book', 4),
(11, 'my test book', 4),
(12, 'my test book', 4),
(13, 'my test book', 4),
(14, 'my test book', 4),
(15, 'my test book', 4),
(16, 'Roxanna', 1),
(17, 'Roxanna', 1),
(18, 'Roxanna', 1),
(19, 'Roxanna', 1),
(20, 'Roxanna', 1),
(25, 'hello world', 1),
(26, 'test', 1),
(27, 'tim 999 test', 1),
(28, 'tim 1000 test', 1),
(29, 'tim 1000 test', 1),
(30, 'tim 1000 test', 1),
(31, 'tim 1000 test', 1),
(32, 'tim 1000 test', 1),
(33, 'tim 1000 test', 1),
(34, 'please work', 16),
(35, 'please work', 16),
(36, 'please work', 16),
(37, 'please work', 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`authorId`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`bookId`),
  ADD KEY `authorId` (`authorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `authorId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `bookId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `author` (`authorId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
