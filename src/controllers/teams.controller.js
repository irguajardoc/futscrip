const { getTeams, addTeam } = require('../models/teams.model');

async function obtenerEquipos(req, res) {
  try {
    const equipos = await getTeams();
    return res.status(200).json(equipos);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function agregarEquipo(req, res) {
  try {
    const { name } = req.body || {};
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'El campo "name" es obligatorio' });
    }

    const equipoCreado = await addTeam({ name });
    return res.status(201).json(equipoCreado);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { obtenerEquipos, agregarEquipo };
