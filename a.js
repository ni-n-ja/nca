// Create a new instance of node-core-audio
var coreAudio = require("node-core-audio");

// Create a new audio engine
var engine = coreAudio.createNewAudioEngine();

// Add an audio processing callback
// This function accepts an input buffer coming from the sound card,
// and returns an ourput buffer to be sent to your speakers.
//
// Note: This function must return an output buffer

function processAudio(inputBuffer) {
    console.log("%d channels", inputBuffer.length);
    console.log("Channel 0 has %d samples",
        inputBuffer[0].length);
    return inputBuffer;
}
engine.addAudioCallback(processAudio);

// var engine = coreAudio.createNewAudioEngine();

// // Grab a buffer
// var buffer = engine.read();

// // Silence the 0th channel
// for (var iSample = 0; iSample < inputBuffer[0].length; ++iSample)
//     buffer[0][iSample] = 0.0;

// // Send the buffer back to the sound card
// engine.write(buffer);