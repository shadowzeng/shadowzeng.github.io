create table mindmap_tab(
   id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   user_id INT UNSIGNED NOT NULL,
   file_name VARCHAR(255) NOT NULL,
   file_content json NOT NULL,
   status_flag INT UNSIGNED NOT NULL,
   ctime INT UNSIGNED NOT NULL,
   mtime INT UNSIGNED NOT NULL,
   PRIMARY KEY ( id )
);

create table mindmap_backup_tab(
   id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   mindmap_id INT UNSIGNED NOT NULL,
   file_name VARCHAR(255) NOT NULL,
   file_content json NOT NULL,
   operator INT UNSIGNED NOT NULL,
   status_flag INT UNSIGNED NOT NULL,
   ctime INT UNSIGNED NOT NULL,
   mtime INT UNSIGNED NOT NULL,
   PRIMARY KEY ( id )
);

create table account_tab(
   id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   user_name VARCHAR(50) NOT NULL,
   email VARCHAR(255) NOT NULL,
   status_flag INT UNSIGNED NOT NULL,
   ctime INT UNSIGNED NOT NULL,
   mtime INT UNSIGNED NOT NULL,
   PRIMARY KEY ( id )
);