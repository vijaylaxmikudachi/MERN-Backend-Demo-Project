import amqp from 'amqplib';

const QUEUE_NAME = 'user-queue';

//message from fundoo Note project

export const  consumeMessages = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                const message = msg.content.toString();
                console.log(`Received message: ${message}`);//Registered user details
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error receiving message:', error);
    }
};

