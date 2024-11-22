document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username && password.length === 4) {
      // ログイン成功（仮のチェック）
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('chatScreen').style.display = 'block';
      
      startChat(username);
    } else {
      alert('ユーザ名と4桁のパスワードを入力してください');
    }
  });
  
  function startChat(username) {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
  
    sendButton.addEventListener('click', function() {
      const message = messageInput.value;
      if (message.trim() !== '') {
        addMessage(username, message, 'user');
        messageInput.value = '';
  
        // ここにサーバーとのメッセージ送受信ロジックを追加する（Socket.ioなどを使用）
        // 仮に相手のメッセージを受信した場合：
        setTimeout(() => {
          addMessage('パートナー', 'これはテストメッセージです', 'partner');
        }, 1000);
      }
    });
  }
  
  function addMessage(username, message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.innerText = `${username}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  