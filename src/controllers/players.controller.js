const { getPlayersByTeam, addPlayerToTeam } = require('../models/players.model');

async function obtenerJugadores(req, res) {
  try {
    const { teamID } = req.params;
    const jugadores = await getPlayersByTeam(teamID);
    return res.status(200).json(jugadores);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function registrarJugador(req, res) {
  try {
    const { teamID } = req.params;
    const { name, position } = req.body || {};

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'El campo "name" es obligatorio' });
    }
    if (!position || Number.isNaN(Number(position))) {
      return res.status(400).json({ message: 'El campo "position" (id de posición) es obligatorio' });
    }

    await addPlayerToTeam({
      teamID: Number(teamID),
      name,
      position: Number(position),
    });

    return res.status(201).json({ message: 'Jugador agregado con éxito' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { obtenerJugadores, registrarJugador };
