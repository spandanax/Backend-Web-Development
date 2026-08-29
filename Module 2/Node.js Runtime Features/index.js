/**
 * Node.js Runtime Features — Streams, Buffers & the File System
 *
 * GOAL
 * Move the SAME file two different ways and feel the difference:
 *   1) Load the whole file into memory with fs.readFile, and log its size.
 *   2) Flow the file through a stream and pipe it to a writable stream (a copy).
 * Then explain, in your own words, why the stream approach is preferable for
 * large files.
 */

const fs = require('fs');
const path = require('path');

// Absolute, OS-safe path to the sample file
const INPUT = path.join(__dirname, 'sample-data.txt');
const OUTPUT = path.join(__dirname, 'sample-copy.txt');

// ── PART 1: read the whole file into memory ─────────────────────────────────
function readWholeFile() {
  fs.readFile(INPUT, (err, data) => {
    // Handle error
    if (err) {
      console.error('readFile error:', err);
      return;
    }

    // Buffer.length gives the size in bytes
    console.log(`readFile: loaded ${data.length} bytes into memory`);
  });
}

// ── PART 2: stream the file and pipe it to a writable stream ────────────────
function streamFile() {
  // Create readable stream
  const readable = fs.createReadStream(INPUT);

  // Create writable stream
  const writable = fs.createWriteStream(OUTPUT);

  // // Handle readable stream errors
  // readable.on('error', (err) => {
  //   console.error('stream read error:', err);
  // });

  // // Handle writable stream errors
  // writable.on('error', (err) => {
  //   console.error('stream write error:', err);
  // });

  // Pipe the file from readable stream to writable stream
  readable.pipe(writable);

  // When copying is finished
  writable.on('finish', () => {
    console.log('stream: finished copying via chunks (flat memory)');
  });
}

// ── PART 3: explanation ─────────────────────────────────────────────────────
//
// readFile loads the entire file into memory at once, so a large file can
// consume a lot of RAM. A stream moves the file in small chunks, so only a
// small amount of data is kept in memory at a time, making it much better
// for large files.
//
// Run both approaches.
readWholeFile();
streamFile();

module.exports = {
  readWholeFile,
  streamFile,
  INPUT,
  OUTPUT
};