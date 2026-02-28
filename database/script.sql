CREATE DATABASE futscript;
\c futscript;

CREATE TABLE equipos (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE posiciones (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE jugadores (id SERIAL PRIMARY KEY, id_equipo INT REFERENCES equipos(id), name VARCHAR(250), position INT REFERENCES posiciones(id));

INSERT INTO posiciones values
(DEFAULT, 'delantero'),
(DEFAULT, 'centrocampista'),
(DEFAULT, 'defensa'),
(DEFAULT, 'portero');


TRUNCATE TABLE jugadores RESTART IDENTITY CASCADE;
TRUNCATE TABLE equipos RESTART IDENTITY CASCADE;


INSERT INTO equipos (name) VALUES
('Colo-Colo'),
('Universidad de Chile'),
('Universidad Catolica'),
('Santiago Wanderers'),
('Palestino');


INSERT INTO jugadores (id_equipo, name, position) VALUES


((SELECT id FROM equipos WHERE name='Colo-Colo'), 'Esteban Pavez', (SELECT id FROM posiciones WHERE name='centrocampista')),
((SELECT id FROM equipos WHERE name='Colo-Colo'), 'Emiliano Amor', (SELECT id FROM posiciones WHERE name='defensa')),
((SELECT id FROM equipos WHERE name='Colo-Colo'), 'Brayan Cortes', (SELECT id FROM posiciones WHERE name='portero')),
((SELECT id FROM equipos WHERE name='Colo-Colo'), 'Carlos Palacios', (SELECT id FROM posiciones WHERE name='delantero')),


((SELECT id FROM equipos WHERE name='Universidad de Chile'), 'Marcelo Diaz', (SELECT id FROM posiciones WHERE name='centrocampista')),
((SELECT id FROM equipos WHERE name='Universidad de Chile'), 'Matias Zaldivia', (SELECT id FROM posiciones WHERE name='defensa')),
((SELECT id FROM equipos WHERE name='Universidad de Chile'), 'Leandro Fernandez', (SELECT id FROM posiciones WHERE name='delantero')),
((SELECT id FROM equipos WHERE name='Universidad de Chile'), 'Cristobal Campos', (SELECT id FROM posiciones WHERE name='portero')),


((SELECT id FROM equipos WHERE name='Universidad Catolica'), 'Fernando Zampedri', (SELECT id FROM posiciones WHERE name='delantero')),
((SELECT id FROM equipos WHERE name='Universidad Catolica'), 'Gary Medel', (SELECT id FROM posiciones WHERE name='defensa')),
((SELECT id FROM equipos WHERE name='Universidad Catolica'), 'Cesar Pinares', (SELECT id FROM posiciones WHERE name='centrocampista')),

((SELECT id FROM equipos WHERE name='Santiago Wanderers'), 'Juan Soto', (SELECT id FROM posiciones WHERE name='portero')),
((SELECT id FROM equipos WHERE name='Santiago Wanderers'), 'Luis Garcia', (SELECT id FROM posiciones WHERE name='defensa')),


((SELECT id FROM equipos WHERE name='Palestino'), 'Brayan Vejar', (SELECT id FROM posiciones WHERE name='centrocampista')),
((SELECT id FROM equipos WHERE name='Palestino'), 'Jonathan Benitez', (SELECT id FROM posiciones WHERE name='delantero'));

