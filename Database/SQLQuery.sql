
Create Table tblEmployeeMaster
(
EmployeeId int Identity(1,1) NOT NULL Primary Key ,
FirstName nvarchar(50) NOT NULL,
MiddleName nvarchar(50) NOT NULL,
LastName nvarchar(50) NOT NULL,
Country nvarchar(50) NOT NULL,
MobileNo nvarchar(50) NOT NULL,
EmailId nvarchar(50) NOT NULL UNIQUE,
AlternateNo nvarchar(50) NULL,
AlternateEmailId nvarchar(50) NULL,
Password nvarchar(50) NOT NULL,
IsActive bit NULL
)
Select * from tblEmployeeMaster

Create Table tblDepartmentMaster
(
DepartmentId int NOT NULL Primary Key,
DepartmentName nvarchar(50) NOT NULL
)
Select * from tblDepartmentMaster

Create Table tblGender
(
ID int NOT NULL Primary key,
GenType nvarchar(50) NOT NULL,
)
Select * from tblGender

Drop Table tblGender
Drop Table tblDepartmentMaster
Drop Table tblEmployeeMaster

Alter table tblEmployeeMaster
Drop column UserName

Insert into tblDepartmentMaster Values(1, 'HR')
Insert into tblDepartmentMaster Values(2, 'IT')
Insert into tblDepartmentMaster Values(3, 'Finance')
Insert into tblDepartmentMaster Values(4 ,'Marketing')
Insert into tblDepartmentMaster Values(5, 'Sales')

Insert into tblGender Values(1, 'Male')
Insert into tblGender Values(2, 'Female')


Select * from tblEmployeeMaster

Set Identity_Insert tblEmployeeMaster OFF

INSERT INTO tblEmployeeMaster (FirstName, MiddleName, LastName, Country, MobileNo, EmailId, AlternateNo, AlternateEmailId, Password, IsActive)
VALUES
  ('Amit', 'Kumar', 'Sharma', 'India', '+91 98765 43210', 'amit.sharma@example.com', '+91 87654 32109', 'amit.alternate@example.com', 'SecurePass', 1),
  ('Priya', 'Singh', 'Yadav', 'India', '+91 78901 23456', 'priya.yadav@example.com', '+91 98765 43210', 'priya.alternate@example.com', 'Pass1234', 1),
  ('Rajesh', 'Gupta', 'Verma', 'India', '+91 87654 32109', 'rajesh.verma@example.com', '+91 78901 23456', 'rajesh.alternate@example.com', 'Secret567', 0),
  ('Sneha', 'Rani', 'Mishra', 'India', '+91 76543 21098', 'sneha.mishra@example.com', '+91 65432 10987', 'sneha.alternate@example.com', 'Password123', 1),
  ('Vikram', 'Singh', 'Chauhan', 'India', '+91 65432 10987', 'vikram.chauhan@example.com', '+91 54321 09876', 'vikram.alternate@example.com', 'SecurePass', 1),
  ('Ananya', 'Shukla', 'Gupta', 'India', '+91 54321 09876', 'ananya.gupta@example.com', '+91 43210 98765', 'ananya.alternate@example.com', 'Pass1234', 1),
  ('Arjun', 'Yadav', 'Sinha', 'India', '+91 43210 98765', 'arjun.sinha@example.com', '+91 32109 87654', 'arjun.alternate@example.com', 'Secret567', 0),
  ('Riya', 'Verma', 'Singh', 'India', '+91 32109 87654', 'riya.singh@example.com', '+91 21098 76543', 'riya.alternate@example.com', 'PassSecure', 1),
  ('Vivek', 'Kumar', 'Garg', 'India', '+91 21098 76543', 'vivek.garg@example.com', '+91 10987 65432', 'vivek.alternate@example.com', 'SecurePass', 0),
  ('Neha', 'Sharma', 'Yadav', 'India', '+91 10987 65432', 'neha.yadav@example.com', '+91 98765 43210', 'neha.alternate@example.com', 'Password123', 1);



DELETE FROM tblEmployeeMaster WHERE EmployeeId In ();

Drop Table tblNewEmployeeMaster


Create Table tblNewEmployeeMaster
(
EmployeeID int Identity(1,1) NOT NULL Primary Key ,
FirstName nvarchar(50) NOT NULL,
MiddleName nvarchar(50) NOT NULL,
LastName nvarchar(50) NOT NULL,
Department nvarchar(50) NOT NULL,
DateOfJoin date NULL,
DateOfBirth date NULL,
Salary int NULL,
Address nvarchar(50) NULL
)
	
Select * from tblNewEmployeeMaster
DELETE FROM tblNewEmployeeMaster WHERE EmployeeID In (16);

Set Identity_Insert tblNewEmployeeMaster OFF

INSERT INTO tblNewEmployeeMaster (FirstName, MiddleName, LastName, Department, DateOfJoin, DateOfBirth, Salary, Address)
VALUES
('Rahul', 'Kumar', 'Sharma', 'IT', '2022-01-10', '1990-05-15', 60000, 'Bangalore'),
('Priya', 'Singh', 'Yadav', 'HR', '2022-02-05', '1985-08-22', 55000, 'Mumbai'),
('Amit', 'Raj', 'Verma', 'Finance', '2022-03-20', '1992-11-08', 70000, 'Delhi'),
('Neha', 'Gupta', 'Mishra', 'Marketing', '2022-04-15', '1988-04-12', 65000, 'Hyderabad'),
('Sandeep', 'Kumar', 'Singh', 'IT', '2022-05-08', '1995-09-18', 62000, 'Chennai'),
('Pooja', 'Sharma', 'Yadav', 'HR', '2022-06-22', '1987-12-03', 58000, 'Pune'),
('Vikas', 'Verma', 'Srivastava', 'Finance', '2022-07-17', '1993-06-25', 72000, 'Mysore'),
('Anjali', 'Singh', 'Yadav', 'Marketing', '2022-08-30', '1989-02-28', 67000, 'Kolkata'),
('Rajesh', 'Kumar', 'Mishra', 'IT', '2022-09-12', '1994-10-10', 63000, 'Jaipur'),
('Shweta', 'Verma', 'Singh', 'HR', '2022-10-05', '1986-07-14', 59000, 'Ahmedabad');



Alter Table tblNewEmployeeMaster
ADD IsActive bit NULL;


	CREATE TABLE tblAttendance
	(
	ID int NOT NULL primary key identity(1,1),
	firstName nvarchar(50) NOT NULL,
	presentDays int NOT NULL,
	absentDays int NOT NULL,
	month int NOT NULL,
	year int NOT NULL
	)

INSERT INTO tblAttendance (firstName, presentDays, absentDays, month, year)
VALUES
    ('Amit', 20, 5, 1, 2024),
    ('Neha', 18, 7, 1, 2024),
    ('Sandeep', 22, 3, 1, 2024),
    ('Pooja', 15, 10, 1, 2024),
    ('Vikas', 25, 0, 1, 2024),
    ('Anjali', 19, 6, 1, 2024),
    ('Rajesh', 21, 4, 1, 2024),
    ('Shweta', 17, 8, 1, 2024);
		
INSERT INTO tblAttendance (firstName,presentDays, absentDays, month, year)
          VALUES ('Sandeep', 18, 0, 4, 2023);




Select * from tblAttendance
Drop table tblAttendance































