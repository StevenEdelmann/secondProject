DROP TABLE IF EXISTS subforum;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS posts;

-- subforum > threads > posts.

CREATE TABLE subforum (
	id INTEGER primary key AUTOINCREMENT,
	name VARCHAR,
	description VARCHAR
);

CREATE TABLE thread (
	id INTEGER primary key AUTOINCREMENT,
	subforum_id INTEGER,
	title VARCHAR,
	creator VARCHAR,
	FOREIGN KEY (subforum_id) REFERENCES subforum (id)
);

CREATE TABLE posts (
	id INTEGER primary key AUTOINCREMENT,
	thread_id INTEGER,
	poster VARCHAR,
	content VARCHAR,
	FOREIGN KEY (thread_id) REFERENCES thread (id)
);

INSERT INTO subforum (name, description) VALUES ("Love and Relationships", "This subforum is for discussing topics of the Heart");
INSERT INTO subforum (name, description) VALUES ("Philosophy", "This subforum is for discussing topics of the Mind");
INSERT INTO subforum (name, description) VALUES ("Health and Sports", "This subforum is for discussing topics of the Body");
INSERT INTO subforum (name, description) VALUES ("Art", "This subforum is for discussing topics of the Soul");
INSERT INTO subforum (name, description) VALUES ("Politics", "This subforum is for discussing topics of the State");
INSERT INTO subforum (name, description) VALUES ("Entertainment and Pop-Culture", "This subforum is for all things modern");
INSERT INTO subforum (name, description) VALUES ("Games", "Come here to play games online with other forum members!");
INSERT INTO subforum (name, description) VALUES ("Other", "Come here to discuss anything not covered in the other subforums");

INSERT INTO thread (subforum_id, title, creator) VALUES (1, "What's your favorite sex position?", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (2, "What Philosophy do you most agree with?", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (3, "What's your favorite sport?", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (4, "What's your favorite genre of music?", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (5, "Who do you want to be president?", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (6, "Nicki Minaj", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (7, "Chess", "Master");
INSERT INTO thread (subforum_id, title, creator) VALUES (8, "Men only: Do you pee sitting down?", "Master");