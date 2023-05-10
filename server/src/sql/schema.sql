CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (2, 'Twinkle Twinkle Little Star', 'C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4 G4 G4 F4 F4 E4 E4 D4 G4 G4 F4 F4 E4 E4 D4 C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4');

INSERT INTO songs (id, song_title, notes)
VALUES (3, 'Mary Had a Little Lamb', 'E4 D4 C4 D4 E4 E4 E4 D4 D4 D4 E4 G4 G4 E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4 D4 E4 E4 E4 E4 E4 D4 D4 E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (4, 'Jingle Bells', 'E4 E4 E4 E4 E4 E4 E4 G4 C4 D4 E4 F4 F4 F4 F4 F4 E4 E4 E4 E4 E4 D4 D4 E4 D4 G4');

INSERT INTO songs (id, song_title, notes)
VALUES (5, 'Happy Birthday', 'C4 C4 D4 C4 F4 E4 C4 C4 D4 C4 G4 F4 C4 C4 C5 A4 F4 E4 D4 A4 A4 A4 F4 G4 F4');

INSERT INTO songs (id, song_title, notes)
VALUES (6, 'We Wish You a Merry Christmas', 'G4 G4 A4 G4 C5 B4 G4 G4 A4 G4 D5 C5 G4 G4 G5 E5 C5 B4 A4 F5 F5 E5 C5 D5 C5');

INSERT INTO songs (id, song_title, notes)
VALUES (7, 'The Entertainer', 'D4 E4 D4 G4 C4 B4 A4 G4 E4 D4 E4 D4 G4 C4 B4 A4 G4 E4 D4 G4 D4 E4 D4 G4 C4 B4 A4 G4 E4 D4 E4 D4 G4 C4 B4 A4 G4 E4 D4 G4 D4 E4 D4 G4 C4 B4 A4 G4 E4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (8, 'ChatGPT Creation', 'C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C6 D6 C6 B5 A5 G5 F5 E5 D5 C5 B4 A4 G4 F4 E4 D4 C4');