"use client";

import { useState } from "react";

export default function CallButton() {
  const phoneNumber = "+918709263087";
  
  const [calling, setCalling] = useState(false);

  async function handleCall() {
    try {
      setCalling(true);

      const response = await fetch(
        "api/call",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to initiate call"
        );
      }

      alert(
        `Call started: ${data.callUuid}`
      );
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Unable to start call"
      );
    } finally {
      setCalling(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCall}
      disabled={calling}
      className="rounded-xl bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
    >
      {calling
        ? "Calling..."
        : "Call Now"}
    </button>
  );
}
