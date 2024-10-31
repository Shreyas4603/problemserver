import redis from 'redis';

const client = redis.createClient({
    host: 'localhost', // Adjust if your Redis server is hosted elsewhere
    port: 6379, // Default Redis port
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

export default client;
