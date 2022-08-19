const { RelayClient } = require("@signalwire/node");
const client = new RelayClient({
  project: "<project-id>",
  token: "<api-token>",
});

async function main() {
  const sendResult = await client.messaging.send({
    contexts: ["office"],
    from: "+1XXXXXXXXXX",
    to: "+1YYYYYYYYYY",
    body: "Welcome to SignalWire!",
  });

  if (sendResult.successful) {
    console.log("Message ID:", sendResult.messageId);
  }
}

main().catch(console.error);

// v3
// const { Messaging } = require("@signalwire/realtime-api");
// const client = new Messaging.Client({
//   project: "<project-id>",
//   token: "<api-token>",
//   contexts: ["office"],
// });

// try {
//   const sendResult = await client.send({
//     from: "+1XXXXXXXXXX", // Your SignalWire number
//     to: "+1YYYYYYYYYY",
//     body: "Welcome to SignalWire!",
//   });
//   console.log(
//     "Message:",
//     sendResult.message,
//     "MessageId:",
//     sendResult.messageId
//   );
// } catch (e) {
//   console.error(e.message);
// }
