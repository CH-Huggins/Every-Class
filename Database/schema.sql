CREATE TABLE IF NOT EXISTS users(
email varchar(40) not null,
userid VARCHAR (36),
password varchar(20) not null,
name varchar(35),
validated boolean,
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


INSERT INTO users VALUES ('andrea.tomas@smail.astate.edu', '29df2339-219f-42dd-8852-3697149c3e24' ,
                            'password', 'Andrea Tomas', TRUE);
INSERT INTO users VALUES ('christia.huggins@smail.astate.edu','725b59d1-6158-465e-b1d8-20db5b1d6399',
                            'password', 'Christian Huggins', TRUE);
INSERT INTO users VALUES ('pauline.gonzalez@smail.astate.edu', 'd4d6649d-0e26-4be1-9568-5af2e8b6dd8a',
                            'password', 'Pauline Gonzalez', TRUE);
