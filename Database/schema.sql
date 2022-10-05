CREATE TABLE students(
email varchar(40) not null,
password varchar(20) not null,
name varchar(35),
GPA decimal(3,2) ,
primary key (email)
);

CREATE TABLE departments(
Name varchar(30),
primary key (name)
);

CREATE TABLE courses(
CRN Varchar(10),
Name varchar(30),
primary key (CRN)
);

CREATE TABLE MajorsIn(
email varchar(40) not null,
name varchar(30) not null,
FOREIGN KEY (email) REFERENCES students (email),
FOREIGN KEY (name) REFERENCES departments (name),
PRIMARY KEY (email,name)
);

CREATE TABLE belongsTo(
CRN Varchar(10),
Name varchar(30),
FOREIGN KEY (CRN) REFERENCES Courses (CRN),
FOREIGN KEY (Name) REFERENCES Departments (Name)
);

CREATE TABLE TakenCourses(
SemesterId varchar(30),
email varchar(40) not null,
name varchar(30) not null,
FOREIGN KEY (email) REFERENCES students (email),
FOREIGN KEY (name) REFERENCES departments (name),
PRIMARY KEY (SemesterId,email,name)
);


INSERT INTO students VALUES ('andrea.tomas@smail.astate.edu', 'password', 'Andrea Tomas', 4.0);
INSERT INTO students VALUES ('christia.huggins@smail.astate.edu', 'password', 'Christian Huggins', 4.0);
INSERT INTO students VALUES ('pauline.gonzalez@smail.astate.edu', 'password', 'Pauline Gonzalez', 3.60);