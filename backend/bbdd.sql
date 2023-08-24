CREATE DATABASE IF NOT EXISTS cursoAngular;
use cursoAngular;

create table productos(
id int(255) auto_increment not null,
nombre varchar(255),
descripcion text,
precio varchar(255),
CONSTRAINT pk_productos PRIMARY KEY(id)
)ENGINE=InnoDB;