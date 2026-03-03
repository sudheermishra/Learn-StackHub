import { loadStripe } from "@stripe/stripe-js";
import {
  BASE_URL,
  STRIPE_PUBLISHABLE_KEY,
  SUPABASE_API_KEY,
} from "../constants";
import { getUser } from "../utils/getUser";
import { isTokenExpired } from "../utils/isTokenExpired";
import { refreshToken } from "../utils/refreshToken";
import { requireAuth } from "../utils/requireAuth";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function paymentLoader({ request, params }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth({ redirectTo: pathname });
  let { access_token, expires_at } = await getUser();
  console.log(access_token);
  if (isTokenExpired(expires_at)) {
    console.log("Token Expired :(");
    access_token = await refreshToken();
  }
  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}functions/v1/create-stripe-payment`,
        { course_id: params.courseID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            apikey: SUPABASE_API_KEY,
          },
        },
      );

      return { clientSecret: data.clientSecret, error: null };
    } catch (error) {
      return {
        error: error?.response?.data?.error || error.message,
        clientSecret: null,
      };
    }
  };
  return await createPaymentIntent();
}

function Payment() {
  const { error, clientSecret } = useLoaderData();
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "4rem auto",
        padding: "0 1rem",
      }}>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.78rem",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}>
        Secure Checkout
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.9rem",
          fontWeight: "800",
          marginBottom: "0.4rem",
          letterSpacing: "-0.02em",
        }}>
        Complete your purchase
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.92rem",
          marginBottom: "2.5rem",
        }}>
        You'll get instant access after payment
      </p>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
