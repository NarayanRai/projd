// server.js

// 1. Import the Express framework
const express = require('express');
const app = express();
const port = 3000; // Define the port the server will listen on

// 2. Define a route handler for the homepage
// When a user makes a GET request to the root URL ('/'), this function runs.
app.get('/', (req, res) => {
  // Use res.send() to send a basic HTML response to the browser
  res.send(`
    <div style="font-family: Inter, sans-serif; padding: 40px; text-align: center; background: #1f2937; color: #f9fafb; border-radius: 12px; max-width: 600px; margin: 50px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
        <h1 style="color: #60a5fa; font-size: 2.5rem; margin-bottom: 15px;">Node.js Server is Live!</h1>
        <p style="font-size: 1.1rem; line-height: 1.5;">This simple server, powered by **Express.js**, is successfully running.</p>
        <p style="font-size: 1.1rem; line-height: 1.5;">Check your VS Code console for the access link.</p>
        <div style="margin-top: 30px; padding: 10px 20px; border: 1px dashed #4b5563; border-radius: 8px; display: inline-block;">
            <code style="color: #a7f3d0;">/</code> route served successfully.
        </div>
    </div>
  `);
});

// 3. Start the server and listen on the defined port
app.listen(port, () => {
  // Confirmation log that appears in the VS Code terminal
  console.log('----------------------------------------------------');
  console.log(`🚀 Server is running successfully!`);
  console.log(`🔗 Access the application at: http://localhost:${port}`);
  console.log('💡 Press Ctrl+C to stop the server.');
  console.log('----------------------------------------------------');
});
