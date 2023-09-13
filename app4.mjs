// Import necessary libraries
const express = require('express');
const Redis = require('ioredis');

// Create an Express app
const app = express();
const port = 3000;

// Create an async function to connect to Redis
async function connectToRedis() {
  const redis = new Redis({
    host: 'localhost', // Your Redis server host
    port: 6379,        // Your Redis server port
  });

  // Wait for the Redis connection to be established
  await redis.connect();

  // Add some data to Redis (optional)
  await redis.set('myKey', 'Hello, Redis!');

  // Close the Redis connection when done (optional)
  redis.quit();

  console.log('Connected to Redis');
}

// Start the Express server
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, async () => {
  // Call the connectToRedis function to connect to Redis before starting the server
  try {
    await connectToRedis();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    process.exit(1);
  }
});