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
        text: "Welcome to SignalWire. We hope you enjoy using our products. Music is about to start.",
      });
      const playback = await call.playAudioAsync(
        "https://cdn.signalwire.com/default-music/welcome.mp3"
      );
      await call.playTTS({
        text: "Music is now playing and will end as soon as this voice message stops. This may be your office information or a welcome message played over the music. You may even want to play the music until the call has been transferred or answered. Music will end in 3, 2, 1",
      });
      playback.stop();
      await call.playTTS({
        text: "The music has ended. Thank you for testing this feature. Goodbye!",
      });
      await call.hangup();
    } catch (e) {
      console.error("Error answering call or playing message:", e);
    }
  },
});

consumer.run();

// const { Voice } = require("@signalwire/realtime-api");
// const client = new Voice.Client({
//   project: "<project-id>",
//   token: "<api-token>",
//   contexts: ["office"],
// });

// client.on("call.received", async (call) => {
//   console.log("Incoming Call");
//   try {
//     await call.answer();
//     console.log("Inbound call answered");
//     const greeting = await call.playTTS({
//       text: "Welcome to SignalWire. We hope you enjoy using our products. Music is about to start.",
//     });
//     await greeting.waitForEnded();
//     const playback = await call.playAudio({
//       url: "https://cdn.signalwire.com/default-music/welcome.mp3",
//     });
//     const voiceover = await call.playTTS({
//       text: "Music is now playing and will end as soon as this voice message stops. This may be your office information or a welcome message played over the music. You may even want to play the music until the call has been transferred or answered. Music will end in 3, 2, 1",
//     });
//     await voiceover.waitForEnded();
//     await playback.stop();
//     const farewell = await call.playTTS({
//       text: "The music has ended. Thank you for testing this feature. Goodbye!",
//     });
//     await farewell.waitForEnded();
//     await call.hangup();
//   } catch (e) {
//     console.error("Error answering call or playing message:", e);
//   }
// });
