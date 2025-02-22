use zfy84
go

-- Add primary key to table: DocGrade
alter table dbo.DocGrade alter column ID int not null
go

if exists(select 1 from INFORMATION_SCHEMA.table_constraints where TABLE_NAME = N'DocGrade' and CONSTRAINT_NAME = N'pk_DocGrade_Id')
begin
	alter table dbo.DocGrade drop constraint pk_DocGrade_Id
end
go

alter table dbo.DocGrade add constraint pk_DocGrade_Id primary key(ID)
go

-- Add primary key to table: WorkstationPath
alter table dbo.WorkstationPath alter column ID int not null
go

if exists(select 1 from INFORMATION_SCHEMA.table_constraints where TABLE_NAME = N'WorkstationPath' and CONSTRAINT_NAME = N'pk_WorkstationPath_Id')
begin
	alter table dbo.WorkstationPath drop constraint pk_WorkstationPath_Id
end
go

alter table dbo.WorkstationPath add constraint pk_WorkstationPath_Id primary key(ID)
go

-- Update admin staff record with correct PolNo and DevNo
update Staff set PolNo = '000000', DevNo = '000000' where ID = 3
go

-- Update first workstations entry, to use as default
update WorkStation set StorePath = 'C:\doc' where ID = 1
go


-- Add Device table
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Device')
begin
	drop table Device
end
create table Device(
	Id int not null identity(1,1) primary key,
	DevNo varchar(10) not null,
	PolNo varchar(10) not null,
	LastConnected datetime not null,
	VideosLastUploaded int not null default 0,
	DeviceStatus varchar(50) not null,
	DeviceStatusProgress int null
)
go