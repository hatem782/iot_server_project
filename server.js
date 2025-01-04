const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
const PORT = 8080;

app.use(express.static("public"));

wss.on("connection", (ws) => {
  console.log("A device connected");

  ws.on("message", (message) => {
    console.log(`Message received: ${message} from html`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("A device disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
