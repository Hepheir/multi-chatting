var ws = new WebSocket('ws://localhost:3000');

ws.onopen = (event) => {
    let req = {
        event: 'open',
        data: '사용자1'
    }
    ws.send(JSON.stringify(req));
}

ws.onmessage = (event) => {
    let res = JSON.parse(event.data);

    switch (res.event) {
        case 'message':
            console.log(res.data);
            break;
    }
}

function send(message) {
    let req = {
        event: 'message',
        data: message
    };
    ws.send(JSON.stringify(req));
}