require("dotenv").config();
const { app } = require('./app');

const PORT = Number(process.env.PORT || 3000);

if (require.main === module) {
  app.listen(PORT, () => console.log(`SERVER ON http://localhost:${PORT}`));
}

module.exports = { app };
