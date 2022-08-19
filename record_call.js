const { RelayConsumer } = require("@signalwire/node");
const consumer = new RelayConsumer({
  project: "<project-id>",
  token: "<api-token>",
  contexts: ["office"],
  onIncomingCall: async (call) => {
    try {
      const { successful } = await call.answer();
      if (!successful) {
        console.error("Answer Error");
        return;
      }
      await call.playTTS({
        text: "Leave a message and press the pound key to finish recording.",
      });
      let { url } = await call.record({
        format: "wav",
        direction: "both",
        // Passing 0 for a timeout disables it.
        initial_timeout: 0,
        end_silence_timeout: 0,
      });
      console.log("Farewell audio playing. URL of recording:" + url);
      await call.playTTS({
        text: "Thank you for the message and goodbye.",
      });
      await call.hangup();
    } catch (e) {
      console.error("Either call hung up by user, or some other error: ", e);
    }
  },
});

consumer.run();

// V3 ----
// const { Voice } = require("@signalwire/realtime-api");

// const client = new Voice.Client({
//   project: "<project-id>",
//   token: "<api-token>",
//   contexts: ["office"],
// });

// client.on("call.received", async (call) => {
//   console.log("Inbound call from", call.from, "to", call.to);
//   try {
//     await call.answer();
//     console.log("Call answered");

//     const greeting = await call.playTTS({
//       text: "Please leave a message. Press the pound key when you are finished recording.",
//     });
//     await greeting.waitForEnded();

//     const recording = await call.recordAudio({
//       format: "wav",
//       direction: "both",
//       // Passing 0 for a timeout disables it.
//       initial_timeout: 0,
//       end_silence_timeout: 0,
//     });

//     call.on("recording.ended", async () => {
//       const { url } = recording;
//       console.log("Farewell audio playing. URL of recording:" + url);

//       const farewell = await call.playTTS({
//         text: "Thank you for the message and goodbye.",
//       });
//       await farewell.waitForEnded();
//       await call.hangup();
//     });
//   } catch (error) {
//     console.error("Error answering inbound call:", error);
//   }
// });
