const { RelayConsumer } = require("@signalwire/node");
const consumer = new RelayConsumer({
  project: "<project-id>",
  token: "<api-token>",
  contexts: ["office"],
  onIncomingCall: async (call) => {
    const { successful } = await call.answer();
    if (!successful) {
      console.error("Answer Error");
      return;
    }
    const collect = {
      type: "digits",
      digits_max: 3,
      text: "Welcome to SignalWire! Please, enter a 3 digit PIN for this test.",
    };
    const prompt = await call.promptTTS(collect);
    if (prompt.successful) {
      const result = prompt.result;
      await call.playTTS({
        text: "You entered: " + result + ". Thanks and goodbye!",
      });
    }
    await call.hangup();
  },
});

consumer.run();

// v3 ---
// const { Voice } = require("@signalwire/realtime-api");
// const client = new Voice.Client({
//   project: "<project-id>",
//   token: "<api-token>",
//   contexts: ["office"],
// });

// client.on("call.received", async (call) => {
//   console.log("Incoming Call");
//   await call.answer();
//   console.log("Inbound call answered");
//   try {
//     const collect = {
//       text: "Welcome to SignalWire! Please, enter a 3 digit PIN for this test followed by the #.",
//       digits: {
//         max: 3,
//         digitTimeout: 10,
//         terminators: "#",
//       },
//       gender: "male",
//     };
//     const prompt = await call.promptTTS(collect);
//     const { digits } = await prompt.waitForResult();
//     const confirm = await call.playTTS({
//       text: "You entered " + digits + ". Thank you and goodbye!",
//       gender: "male",
//     });
//     await confirm.waitForEnded();
//     console.log("Hanging up");
//     await call.hangup();
//   } catch (e) {
//     console.error("Either call hung up by user, or some other error: ", e);
//   }
// });
