require("dotenv").config();
const request = require('supertest');
const { app } = require('../src/app');
const { pool } = require('../src/config/db');

let token;
let teamID;

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/login')
    .send({ username: 'admin', password: '1234' });

  token = loginRes.body.token;
  const { rows } = await pool.query('SELECT id FROM equipos ORDER BY id ASC LIMIT 1;');
  if (rows.length === 0) {
    const ins = await pool.query("INSERT INTO equipos (name) VALUES ('Equipo Test') RETURNING id;");
    teamID = ins.rows[0].id;
  } else {
    teamID = rows[0].id;
  }
});

afterAll(async () => {
  await pool.end();
});

describe('FutScript API', () => {
  test('GET /equipos retorna un Array y status 200', async () => {
    const res = await request(app).get('/equipos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /login con credenciales correctas retorna un Object', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' });

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('token');
  });

  test('POST /login con credenciales incorrectas retorna status 400', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'mala' });

    expect(res.statusCode).toBe(400);
  });

  test('POST /equipos/:teamID/jugadores con token válido retorna status 201', async () => {
    const res = await request(app)
      .post(`/equipos/${teamID}/jugadores`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Jugador Test', position: 1 });

    expect(res.statusCode).toBe(201);
  });
});
