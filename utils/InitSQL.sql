drop table if exists Orders cascade;
drop type if exists status;
drop table if exists Products;
drop table if exists Users;
drop type if exists tip_utilizator;

create type tip_utilizator as enum ('Curier', 'Client');

create table Users (
	id_user serial primary key,
	user_email text not null unique,
    user_password text not null,
	user_type tip_utilizator not null
);


create table Products(
	id_product serial primary key,
	product_name text unique not null
);

INSERT INTO public.products (product_name) values
											('Pizza'),
											('Burger'),
											('Pasta'),
											('Taco');

create type status as enum ('Created', 'Delivering', 'Delivered', 'Crashed');

create table Orders(
	id_order serial primary key,
	id_client int references Users(id_user) not null,
	id_curier int references Users(id_user),
	order_status status default 'Created',
	id_product int references Products(id_product) not null,
	castig int not null check(castig>0),
	create_date timestamptz default now()
)