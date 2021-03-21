-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 21, 2021 at 02:22 AM
-- Server version: 5.7.33
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutnutte_judao_dynamic_questions`
--
CREATE DATABASE IF NOT EXISTS `nutnutte_judao_dynamic_questions` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `nutnutte_judao_dynamic_questions`;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(5) NOT NULL,
  `question_description` varchar(255) COLLATE utf8_bin NOT NULL,
  `choice_a` varchar(255) COLLATE utf8_bin NOT NULL,
  `choice_b` varchar(255) COLLATE utf8_bin NOT NULL,
  `choice_c` varchar(255) COLLATE utf8_bin NOT NULL,
  `choice_d` varchar(255) COLLATE utf8_bin NOT NULL,
  `correct_answer` char(1) COLLATE utf8_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='all';

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_description`, `choice_a`, `choice_b`, `choice_c`, `choice_d`, `correct_answer`) VALUES
(1, 'Do you like cats?', 'Yes', 'Sometimesfdfd', 'Maybe', '456', 'c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);
--
-- Database: `nutnutte_question`
--
CREATE DATABASE IF NOT EXISTS `nutnutte_question` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `nutnutte_question`;

-- --------------------------------------------------------

--
-- Table structure for table `QUESTION`
--

CREATE TABLE `QUESTION` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `ans1` varchar(255) DEFAULT NULL,
  `ans2` varchar(255) DEFAULT NULL,
  `ans3` varchar(255) DEFAULT NULL,
  `ans4` varchar(255) DEFAULT NULL,
  `correctAnswer` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `QUESTION`
--

INSERT INTO `QUESTION` (`id`, `question`, `ans1`, `ans2`, `ans3`, `ans4`, `correctAnswer`) VALUES
(1, 'Should pineapple belong on pizza?', 'Yes', 'No', 'Maybe', 'So', '3'),
(2, 'Favourite kind of bear?', 'Papa bear', 'Mama bear', 'Black bear', 'asdf', '1'),
(3, 'Olympics in Vancouver was when?', '500', '1600', '1995', '2010', '4');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `ans1` varchar(255) DEFAULT NULL,
  `ans2` varchar(255) DEFAULT NULL,
  `ans3` varchar(255) DEFAULT NULL,
  `ans4` varchar(255) DEFAULT NULL,
  `correctAnswer` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `question`, `ans1`, `ans2`, `ans3`, `ans4`, `correctAnswer`) VALUES
(1, 'Should pineapple belong on pizza?', 'Yes', 'No', 'Maybe', 'So', '3'),
(2, 'Should pineapple belong on pizza?', 'Yes', 'No', 'Maybe', 'So', '3'),
(3, 'Test', 'test', 'test', 'test', 'test', '3'),
(4, 'Test new question!', 'Hello', 'Yes', 'Why', 'Not even a question.', '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `QUESTION`
--
ALTER TABLE `QUESTION`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `QUESTION`
--
ALTER TABLE `QUESTION`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Database: `nutnutte_scores`
--
CREATE DATABASE IF NOT EXISTS `nutnutte_scores` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `nutnutte_scores`;

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `name` varchar(100) DEFAULT NULL,
  `score` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`name`, `score`) VALUES
('lab5', 55),
('test', 123),
('test', -123),
('Harold', 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
