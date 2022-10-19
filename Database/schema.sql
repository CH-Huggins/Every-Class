CREATE TABLE IF NOT EXISTS users(
email    VARCHAR(40) not null,
userID   TEXT PRIMARY KEY,
hash     TEXT UNIQUE NOT NULL,
name     VARCHAR(35),
validated boolean default (false),
primary key (userID)
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

