import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/thankyou`,
      },
    });
    console.log(error);
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "2rem",
      }}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        style={{
          width: "100%",
          height: "48px",
          background: isProcessing ? "var(--surface-2)" : "var(--accent)",
          color: "#0C0F1E",
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: "700",
          border: "none",
          borderRadius: "6px",
          cursor: isProcessing ? "not-allowed" : "pointer",
          opacity: !stripe || !elements ? 0.5 : 1,
          letterSpacing: "0.02em",
          transition: "all 0.2s",
        }}>
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
      {message && (
        <div
          style={{
            color: "var(--danger)",
            fontSize: "0.88rem",
            background: "rgba(248, 113, 113, 0.08)",
            border: "1px solid rgba(248, 113, 113, 0.2)",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            textAlign: "center",
          }}>
          {message}
        </div>
      )}
    </form>
  );
}
