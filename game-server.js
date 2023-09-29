const net = require('net');


const server = net.createServer(cnn => {
  let minNum, maxNum;

  cnn.on('data', (data) => {
    const request = JSON.parse(data);
    if (request.range) {
      const [min, max] = request.range.split('-');
      minNum = parseInt(min);
      maxNum = parseInt(max);

      cnn.write(JSON.stringify({ answer: Math.floor((minNum + maxNum) / 2) }));

    } else {
        if (request.hint === "less") {
          maxNum = Math.floor((minNum + maxNum) / 2) - 1;
        }
        if (request.hint === "more") {
          minNum = Math.floor((minNum + maxNum) / 2) + 1;
        }
        cnn.write(JSON.stringify({ answer: Math.floor((minNum + maxNum) / 2) }));
    }
  });
});

server.listen(3000, 'localhost', () => {
console.log('Сервер готов к игре...');
  console.log('Сервер запущен на порту 3000');
});
