const net = require('net')
const minNum = process.argv[2]
const maxNum = process.argv[3]

const randomAnswer = Math.floor(Math.random() * (maxNum - minNum) + minNum);
let try_counter = 0
console.log(`Рандомное загаданное число: ${randomAnswer}`)



const client = net.connect(3000, 'localhost', () => {
  console.log(`Range: ${minNum}-${maxNum}`);
  client.write(JSON.stringify({ range: `${minNum}-${maxNum}` }));
});

client.on('data', (data) => {
  const response = JSON.parse(data);
  if (response.answer < randomAnswer) {
    try_counter++
    console.log(`Сервер вернул число: ${response.answer}. Hint: more`);
    client.write(JSON.stringify({ hint: 'more' }));
  } else if (response.answer > randomAnswer) {
    try_counter++
    console.log(`Сервер вернул число: ${response.answer}. Hint: less`);
    client.write(JSON.stringify({ hint: 'less' }));
  } else {
    console.log(`Сервер угадал число ${randomAnswer}. Серверу потребовалось ${try_counter} попытки`);
    client.destroy();
  }
});

client.on('close', () => {
  console.log('Connection closed.');

});
