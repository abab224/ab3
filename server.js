// 必要なモジュールをインポート
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// アプリケーションとサーバーの設定
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 静的ファイルを提供する設定
app.use(express.static('public'));

// ルートURLで index.html を提供
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// WebSocket の接続処理
io.on('connection', (socket) => {
    console.log('A user connected');

    // メッセージの受信
    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('message', msg); // すべてのクライアントに送信
    });

    // ユーザーが切断したときの処理
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// サーバーを指定ポートで起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
