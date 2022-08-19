const { RelayConsumer } = require("@signalwire/node");
const consumer = new RelayConsumer({
  project: "<project-id>",
  token: "<api-token>",
  contexts: ["office"],
  ready: async (consumer) => {
    const dialResult = await consumer.client.calling.dial({
      type: "phone",
      from: "+1XXXXXXXXXX", // Must be a number in your SignalWire Space
      to: "+1YYYYYYYYYY",
    });
    const { successful, call } = dialResult;
    if (!successful) {
      console.error("Dialing error..");
      return;
    }
    await call.playTTS({
      text: "This is a test call from SignalWire. Thank you.",
    });
    await call.hangup();
  },
});
consumer.run();

// v3 ---
// const { Voice } = require("@signalwire/realtime-api");
// const client = new Voice.Client({
//   project: "<project-id>",
//   token: "<api-token>",
//   contexts: ["default"],
// });
// try {
//   const call = await client.dialPhone({
//     from: "+YYYYYYYYYY", // Must be a number in your SignalWire Space
//     to: "+XXXXXXXXXX",
//     timeout: 30,
//   });
//   const welcome = await call.playTTS({
//     text: "Hello! Welcome to SignalWire.",
//     gender: "male",
//   });
//   await welcome.waitForEnded();
//   await call.hangup();
// } catch (e) {
//   console.log("Call not answered.", e);
// }
