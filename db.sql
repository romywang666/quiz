
--

create database quiz000;
use quiz000;


CREATE TABLE quiz(
    id int(10) NOT NULL auto_increment,
    quest_class varchar(15),
    quest_type varchar(15),
    question varchar(512) NOT NULL,
    answer1 varchar(512),
    answer2 varchar(512),
    answer3 varchar(512),
    answer4 varchar(512),
    correct_answer varchar(15) NOT NULL,
    image   mediumblob,
    PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE quiz ADD image mediumblob;
ALTER TABLE quiz ADD quest_class varchar(15);
drop table cascade;

INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer) 
VALUES ('How far away is the moon?', 'Medium', '238,900 mi', '238,900 KM', '238,900 Feet', '238,900 L','a');
INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer) 
VALUES ('How far away is the Sun?', 'Low', '150 million meters', '150 million kilometers', '150 million Feet', '150 million L','b');
INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer) 
VALUES ('How many countries are there in the world?', 'High', '180', '195', '178', '199','b');
INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer) 
VALUES ('What Is The Capital Of Canada?', 'Medium', ' Toronto', 'Ottawa', 'Vancouver', 'Calgary','b');
INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer) 
VALUES ('where is united nations headquarters located?', 'Low', 'New York', 'Zurich', 'Paris', 'London','a');
INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer) 
VALUES ('how many states are there in the united states?', 'High', '49', '50', '51', '52','b');




CREATE TABLE users(
    id bigint(10) NOT NULL auto_increment,
    user_name varchar(25) NOT NULL,
    password varchar(15) NOT NULL,
    user_level varchar(10) NOT NULL,
    first_name varchar(25),
    last_name varchar(25),
    sex varchar(10),
    birth_date datetime,
    email varchar(50),
    phone_no varchar(15),
    address varchar(100),
    PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE UNIQUE INDEX idx_user_name ON users(user_name);

--user_level: 0 admin, 1 student who can take a quiz
INSERT INTO users(user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address)
VALUES ('admin', '1234', 'ADMIN', 'Tom', 'Hanks', 'Male','1968/02/02','tom.hanks@gmail.com', '626-823-9942','150 W University Blvd, Melbourne, FL 32901, United States');
INSERT INTO users(user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address)
VALUES ('user', '1234', 'TESTER', 'Marilyn', 'Monroe','Female','1978/05/23', 'marilyn.monroe@gmail.com', '778-990-5533', '116 St. and 85 Ave. Edmonton, Alberta T6G 2R3 Canada');
INSERT INTO users(user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address)
VALUES ('QU1001', '1234', 'TESTER', 'Mike', 'Jackson', 'Male', '1970/01/16','mike.jackson@gmail.com', '604-634-8824', '1200 East California Boulevard Pasadena, California 91125, United States');
INSERT INTO users(user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address)
VALUES ('QU1011', '1234', 'TESTER', 'Tom', 'Cruse', 'Male', '1964/03/13','tom.cruse@gmail.com', '604-883-6654', '2039 Kennedy Blvd Jersey City, NJ 07305, United States');
INSERT INTO users(user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address)
VALUES ('QU1012', '1234', 'TESTER', 'Edward', 'Blais', 'Male','1969/09/11','edward.blais@gmail.com', '706-554-3320','12 Capen Hall, Buffalo, New York 14260-1660 , United States');
INSERT INTO users(user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address)
VALUES ('QU1013', '1234', 'TESTER', 'Matthew', 'Lisson', 'Male','1966/12/09','matthew.lisson@gmail.com', '778-663-2233','Massachusetts Hall Cambridge, MA 02138, United States');

UPDATE users SET user_level='TESTER' WHERE user_name='user';


