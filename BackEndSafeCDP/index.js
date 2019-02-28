require('dotenv').config();
const PORT = process.env.PORT || 9000;

const server = require('./api/server');

server.get('/', (req, res) => {
  res.send('<h1>server running</h1>');
});

server.listen(PORT, console.log(`Server is up and running on port ${PORT}!`));
