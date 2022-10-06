CREATE TABLE IF NOT EXISTS users(
email varchar(40) not null,
userID VARCHAR (10),
password varchar(20) not null,
name varchar(35),
validated boolean default (false),
primary key (email)
);

CREATE TABLE IF NOT EXISTS  students(
email varchar(40) not null,
name varchar(35),
GPA decimal(3,2) ,
FOREIGN KEY (email) REFERENCES users(email) on delete cascade on update cascade,
primary key (email)
);

CREATE TABLE IF NOT EXISTS  departments(
Name varchar(30),
primary key (name)
);

CREATE TABLE IF NOT EXISTS  courses(
CRN Varchar(10),
Name varchar(30),
credits integer,
primary key (CRN)
);

CREATE TABLE IF NOT EXISTS  MajorsIn(
email varchar(40) not null,
name varchar(30) not null,
FOREIGN KEY (email) REFERENCES students (email) on delete cascade on update cascade,
FOREIGN KEY (name) REFERENCES departments (name) on delete cascade on update cascade,
PRIMARY KEY (email,name)
);

CREATE TABLE  IF NOT EXISTS departmentCourses(
CRN Varchar(10),
Name varchar(30),
FOREIGN KEY (CRN) REFERENCES Courses (CRN) on delete cascade on update cascade,
FOREIGN KEY (Name) REFERENCES Departments (Name) on delete cascade on update cascade
);

CREATE TABLE IF NOT EXISTS  Semesters(
semesterID varchar(30),
primary key (semesterID)
);

CREATE TABLE IF NOT EXISTS  TakenCourses(
semesterID varchar(30),
email varchar(40) not null,
name varchar(30) not null,
FOREIGN KEY (email) REFERENCES students (email) on delete cascade on update cascade,
FOREIGN KEY (name) REFERENCES departments (name) on delete cascade on update cascade,
FOREIGN KEY (semesterID) REFERENCES Semesters(semesterID) on delete cascade on update cascade,
PRIMARY KEY (SemesterId,email,name)
);


INSERT INTO users VALUES ('andrea.tomas@smail.astate.edu', '16267017' ,'password', 'Andrea Tomas', TRUE);
INSERT INTO users VALUES ('christia.huggins@smail.astate.edu','16895647' ,'password', 'Christian Huggins', TRUE);
INSERT INTO users VALUES ('pauline.gonzalez@smail.astate.edu', '45627863','password', 'Pauline Gonzalez', TRUE);
