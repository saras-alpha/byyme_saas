export async function POST() {
  const destination = process.env.DESTINATION_PHONE_NUMBER;

  if (!destination) {
    return new Response(
      "DESTINATION_PHONE_NUMBER is missing",
      { status: 500 }
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Number>${destination}</Number>
  </Dial>
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