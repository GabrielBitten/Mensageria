const amqp = require('amqplib'); 

async function recebeMsg() {
  const connect = await amqp.connect('amqp://localhost');
  const canal = await connect.createChannel();
  const queue = 'mensagens';


  await canal.assertQueue(queue, {
    durable: true 
  });

  canal.consume(queue, (msg) => {
    console.log(`Received: ${msg.content.toString()}`);
    canal.ack(msg); 
  });
}

recebeMsg().catch(console.error);  
