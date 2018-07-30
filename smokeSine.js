const portAudio = require('naudiodon');

var sampleRate = 44100;
var tableSize = 200;
var buffer = Buffer.allocUnsafe(tableSize * 4);
for (var i = 0; i < tableSize * 4; i++) {
  buffer[i] = (Math.sin((i / tableSize) * 3.1415 * 2.0) * 127);
}

var ao = new portAudio.AudioOutput({
  channelCount: 2,
  sampleFormat: portAudio.SampleFormat8Bit,
  sampleRate: sampleRate,
  deviceId: -1
});

function tenSecondsIsh(writer, data) {
  var i = 552;
  write();

  function write() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.end(data, console.log("Done!"));
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

ao.on('error', console.error);

tenSecondsIsh(ao, buffer);
ao.start();

process.once('SIGINT', ao.quit);