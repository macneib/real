const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'user', 'userpass', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize
  .sync()
  .then(() =>
    User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    })
  )
  .then(jane => {
    console.log(jane.toJSON());
  });

wss.on('connection', function connection(ws) {
  console.log('client connected');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

console.log('[Websocket] Server Started on port 8080');
