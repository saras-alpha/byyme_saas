import plivo from "plivo";

export async function POST(request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return Response.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 }
      );
    }

    const authId = process.env.PLIVO_AUTH_ID;
    const authToken = process.env.PLIVO_AUTH_TOKEN;
    const from = process.env.DESTINATION_PHONE_NUMBER;
    const publicUrl = process.env.NEXT_PUBLIC_APP_URL;

    
  

    if (!authId || !authToken || !from || !publicUrl) {
      return Response.json(
        {
          success: false,
          message: "Plivo configuration is missing",
        },
        { status: 500 }
      );
    }

    const client = new plivo.Client(
      authId,
      authToken
    );

    const answerUrl =
      `${publicUrl}/api/plivo/answer`;

    const response = await client.calls.create(
      from,
      phoneNumber,
      answerUrl,
      {
        answerMethod: "POST",
      }
    );

    console.log("Plivo call:", response);

    return Response.json({
      success: true,
      callUuid: response.requestUuid,
      message: "Call initiated",
    });
  } catch (error) {
    console.error("Plivo call error:", error);

    return Response.json(
      {
        success: false,
        message:
          error?.message ||
          "Unable to initiate call",
      },
      { status: 500 }
    );
  }
}
