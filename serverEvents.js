let connectedClients = [];

function eventsHandler(req, res, next) {
  // sse required headers
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // add new client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  connectedClients.push(newClient);
  console.log(`New client with id ${clientId} connected. Current # of clients: ${connectedClients.length} `);
  // remove client
  req.on("close", () => {
    connectedClients = connectedClients.filter((c) => c.id !== clientId);
    console.log(`Connection closed for id: ${clientId}. Number of clients still connected: ${connectedClients.length} `);
  });
}

function broadcastMessage(data) {
  console.log("Broadcasting message to all clients...")
  connectedClients.forEach((c) => c.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

module.exports = { eventsHandler, broadcastMessage };
