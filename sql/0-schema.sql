/*
Boards
board_id | board_name

Posts
post_id | board_id | user_id | post_date | post_contents

Users
user_id | user_joined | user_name | user_details

*/

drop table if exists posts;
drop table if exists users;
drop table if exists boards;


create table boards (
    board_id int unsigned not null auto_increment,
    primary key(board_id),
    board_name varchar(255)
);

create table users(
    user_id int unsigned not null auto_increment,
    primary key(user_id),
    user_joined datetime,
    user_name varchar(255),
    user_details text,
    password_hash varchar(64)
);

create table posts(
    post_id int unsigned not null auto_increment,
    primary key(post_id),
    board_id int unsigned,
    foreign key(board_id) references boards(board_id),
    user_id int unsigned,
    foreign key(user_id) references users(user_id),
    post_created datetime,
    post_contents text
);

/*
The token is a hash of the users.password_hash
*/
create table session(
    session_id int unsigned not null auto_increment,
    primary key(session_id),
    user_id int unsigned,
    foreign key(user_id) references users(user_id),
    token varchar(64),
    expires datetime
);
