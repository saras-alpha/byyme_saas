export async function POST() {
  const wsUrl = process.env.PIPECAT_WS_URL;

  if (!wsUrl) {
    return new Response(
      "PIPECAT_WS_URL is missing",
      { status: 500 }
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Speak>
    Hello! Please wait while I connect you to our AI assistant.
  </Speak>

  <Stream
    bidirectional="true"
    keepCallAlive="true"
    contentType="audio/x-mulaw;rate=8000"
    statusCallbackUrl="${process.env.PIPECAT_PUBLIC_URL}/api/plivo/stream-status">
    ${wsUrl}
  </Stream>
</Response>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export async function GET() {
  return POST();
}
