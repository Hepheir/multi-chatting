const ws = require('ws');

const server = new ws.Server({ port: 3000 });
const clients = [];

function broadcast(text) {
    const req = {
        event: 'message',
        data: text
    };
    clients.forEach(c => c.send(JSON.stringify(req)));
    console.log(text);
}

server.on('connection', (client) => {
    client.on('message', (message) => {
        const res = JSON.parse(message);
        switch (res.event) {
            case 'open':
                client.nickname = res.data;
                broadcast(`${client.nickname}님이 입장했습니다.`);
                break;

            case 'message':
                broadcast(`[${client.nickname}] ${res.data}`);
                break;
        }
    });
    clients.push(client);
});