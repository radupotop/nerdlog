/* boards */

insert into boards values(1, 'General talk');
insert into boards values(2, 'Software');
insert into boards values(3, 'Games');

/* users */

insert into users values(1, '2015-01-06 12:00:00', 'Radu P', null);
insert into users values(2, '2015-01-07 12:00:00', 'Mircea S', 'Huge nerd');
insert into users values(3, '2015-01-08 12:00:00', 'Virgiliu D', 'Likes cats');

/* posts */

insert into posts values(1, 1, 1, '2015-01-06 12:10:00', 'Hello world!');
insert into posts values(2, 1, 2, '2015-01-06 12:10:00', 'Hola!');
insert into posts values(3, 1, 3, '2015-01-06 12:10:00', 'Hey guys');

insert into posts values(4, 2, 1, '2015-01-06 12:20:00', 'Hello world!');
insert into posts values(5, 2, 2, '2015-01-06 12:20:00', 'Hola!');
insert into posts values(6, 2, 3, '2015-01-06 12:20:00', 'Hey guys');

insert into posts values(7, 3, 1, '2015-01-06 12:30:00', 'Hello world!');
insert into posts values(8, 3, 2, '2015-01-06 12:30:00', 'Hola!');
insert into posts values(9, 3, 3, '2015-01-06 12:30:00', 'Hey guys');
