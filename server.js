const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 静的ファイルの提供 (フロントエンドファイルが保存されているディレクトリ)
app.use(express.static('public'));

// WebSocketの接続処理
io.on('connection', (socket) => {
  console.log('新しいユーザが接続しました');

  // メッセージを受信したときの処理
  socket.on('message', (msg) => {
    console.log('メッセージ: ' + msg);
    io.emit('message', msg); // 全ユーザにメッセージを送信
  });

  // ユーザが切断したときの処理
  socket.on('disconnect', () => {
    console.log('ユーザが切断しました');
  });
});

// クラウド環境で動作するように、ポートを process.env.PORT から取得
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で動作中`);
});
