// Function to convert a ReadableStream to a JSON object
export async function streamToJSON(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const json = JSON.parse(buffer.toString('utf8'));
  return json;
}