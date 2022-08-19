const { RelayConsumer } = require("@signalwire/node");

const consumer = new RelayConsumer({
  project: "<project-id>",
  token: "<api-token>",
  contexts: ["support"],
  onIncomingMessage: async (message) => {
    console.log("Received message", message.id);
    const customer = message.from;
    const sendResult = await consumer.client.messaging.send({
      context: "office",
      from: "+YYYYYYYYYY", // Must be a number in your SignalWire Space
      to: customer,
      body: "We have received your service request and will follow up shortly.",
    });
    if (sendResult.successful) {
      console.log("Message ID:", sendResult.messageId);
    } else {
      console.log(sendResult.errors);
    }
  },
});

consumer.run();

// v3 ---
// const { Messaging } = require("@signalwire/realtime-api");

// const client = new Messaging.Client({
//   project: "<project-id>",
//   token: "<api-token>",
//   contexts: ["support"],
// });
// client.on("message.received", async (message) => {
//   console.log("Message received:", message);
//   const customer = message.from;
//   try {
//     const sendResult = await client.send({
//       from: "+YYYYYYYYYY", // Must be a number in your SignalWire Space
//       to: customer,
//       body: "We have received your service request and will follow up shortly.",
//     });
//     console.log("Message ID:", sendResult.messageId);
//   } catch (e) {
//     console.error(e.message);
//   }
// });
