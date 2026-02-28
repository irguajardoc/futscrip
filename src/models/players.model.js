const { pool } = require('../config/db');

async function getPlayersByTeam(teamID) {
  const query = {
    text: `
      SELECT j.name, p.name AS posicion
      FROM jugadores j
      INNER JOIN posiciones p ON j.position = p.id
      WHERE j.id_equipo = $1
      ORDER BY j.id ASC;
    `,
    values: [teamID],
  };

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    throw new Error(`Error al obtener jugadores: ${err.message}`);
  }
}

async function addPlayerToTeam({ teamID, name, position }) {
  const query = {
    text: `
      INSERT INTO jugadores (id_equipo, name, position)
      VALUES ($1, $2, $3)
      RETURNING id;
    `,
    values: [teamID, name, position],
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    throw new Error(`Error al agregar jugador: ${err.message}`);
  }
}

module.exports = { getPlayersByTeam, addPlayerToTeam };
