
CREATE SCHEMA IF NOT EXISTS `twitterdb` DEFAULT CHARACTER SET utf8 ;
USE `twitterdb` ;

-- -----------------------------------------------------
-- Table `twitterdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`users` (
  `user_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `profile_photo` VARCHAR(255) NULL,
  `profile_photo_banner` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `birth_day` VARCHAR(255) NOT NULL,
  `join_date`  VARCHAR(255) NOT NULL,
  `bio` VARCHAR(255) NULL ) ;

-- -----------------------------------------------------
-- Table `twitterdb`.`tweets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`tweets` (
  `tweet_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_name` VARCHAR(45) NOT NULL,
  `tweet_date`  VARCHAR(255) NOT NULL,
  `tweet_text` VARCHAR(255) NULL,
  `tweet_photo` VARCHAR(255) NULL,
  ` user_id` INT UNSIGNED NOT NULL, 
  CONSTRAINT `fk_tweet_users`
    FOREIGN KEY (` user_id`)
    REFERENCES `twitterdb`.`users` (`user_id`) ) ;


-- -----------------------------------------------------
-- Table `twitterdb`.`follows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`follows` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `follow_user_id` INT UNSIGNED NOT NULL,  
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`user_id`) ,
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`follow_user_id`)
    REFERENCES `twitterdb`.`users` (`user_id`) );
 


-- -----------------------------------------------------
-- Table `twitterdb`.`users_like_tweet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`liked_tweets` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `tweet_id` INT UNSIGNED NOT NULL, 
  CONSTRAINT `fk_users_has_tweet_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`user_id`) ,
  CONSTRAINT `fk_users_has_tweet_tweet1`
    FOREIGN KEY (`tweet_id`)
    REFERENCES `twitterdb`.`tweets` (`tweet_id`) );
 


-- -----------------------------------------------------
-- Table `twitterdb`.`users_block_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`blocked_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `bloked_user_id`  INT UNSIGNED NOT NULL, 
  CONSTRAINT `fk_users_has_users_users3`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`user_id`) ,
  CONSTRAINT `fk_users_has_users_users4`
    FOREIGN KEY (`bloked_user_id`)
    REFERENCES `twitterdb`.`users` (`user_id`) ) ;
 