const { pool } = require('../config/db');

async function getTeams() {
  const query = {
    text: 'SELECT id, name FROM equipos ORDER BY id ASC;',
  };

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    throw new Error(`Error al obtener equipos: ${err.message}`);
  }
}

async function addTeam({ name }) {
  const query = {
    text: 'INSERT INTO equipos (name) VALUES ($1) RETURNING id, name;',
    values: [name],
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    throw new Error(`Error al agregar equipo: ${err.message}`);
  }
}

module.exports = { getTeams, addTeam };
