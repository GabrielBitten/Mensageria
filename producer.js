const amqp = require('amqplib');

async function enviaMsg() {
  const connect = await amqp.connect('amqp://localhost');
  const canal = await connect.createChannel();
  const queue = 'mensagens';

  await canal.assertQueue(queue, {
    durable: true
  });

  
  for (let i = 1; i <= 10; i++) {
    const message = `mensagem ${i}`;
    canal.sendToQueue(queue, Buffer.from(message), {
      persistent: true
    });
    console.log(`Sent: ${message}`);
  }

  setTimeout(() => {
    connect.close();
  }, 500);
}

enviaMsg().catch(console.error);
