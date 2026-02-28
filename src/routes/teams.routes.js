const { Router } = require('express');
const { obtenerEquipos, agregarEquipo } = require('../controllers/teams.controller');
const { obtenerJugadores, registrarJugador } = require('../controllers/players.controller');
const { requireToken } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/equipos', obtenerEquipos);
router.post('/equipos', requireToken, agregarEquipo);

router.get('/equipos/:teamID/jugadores', obtenerJugadores);
router.post('/equipos/:teamID/jugadores', requireToken, registrarJugador);

module.exports = router;
