import {
  PaymentElement,
  useStripe,
  CardElement,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ price, cart }) {
  const [cardError, setCardError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Invalid price:", price);
      return;
    }
    const description = `Purchase of ${cart.length} items by ${user?.email}`;
    axiosSecure
      .post("/create-payment-intent", { price, description })
      .then((res) => {
        console.log(res.data.clientSecret);
        if (!res || !res.data) {
          throw new Error("No response or empty response from server");
        }
        const clientSecret = res.data.clientSecret;
        if (!clientSecret) {
          throw new Error("Client secret not received from server");
        }
        setClientSecret(clientSecret);
      })
      .catch((error) => console.error("Error creating payment intent:", error));
  }, [price, cart.length, axiosSecure, user?.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      console.log("!stripe || !elements || isProcessing");
      return; // Avoid double submission
    }

    setIsProcessing(true); // Start processing
    setCardError(null); // Clear previous errors

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    if (!card) {
      setCardError("Card element is missing.");
      setIsProcessing(false); // Reset processing state
      return;
    }
    const { error, PaymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: "John Doe",
              email: "john.doe@example.com",
              address: {
                line1: "123 Main St",
                city: "Somewhere",
                state: "CA",
                postal_code: "12345",
                country: "US", // Make sure this is not India for non-INR transactions
              },
            },
          },
        });

      if (confirmError) {
        console.error("Error during payment confirmation:", confirmError);
        setCardError(confirmError.message);
      } else if (paymentIntent) {
        console.log("PaymentIntent confirmed:", paymentIntent);
      } else {
        console.warn("PaymentIntent is undefined or has an unexpected status.");
      }

      if (paymentIntent.status === "succeeded") {
        setCardError(`Your TransactionId id ${paymentIntent.id}`);
        console.log(paymentIntent.id);
        const paymentInfo = {
          email: user.email,
          transactionId: paymentIntent.id,
          price,
          quantity: cart.length,
          status: "Order Pending",
          itemName: cart.map((item) => item.title),
          cartItems: cart.map((item) => item._id),
          menuItems: cart.map((item) => item.menuItemId),
        };
        console.log(paymentInfo);

        // sending info to backend
        axiosSecure.post("/payments", paymentInfo).then((res) => {
          console.log(res.data);
        });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setCardError("An unexpected error occurred during payment confirmation.");
    } finally {
      setIsProcessing(false); // Reset the flag after processing
      navigate("/order");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 mt-20">
      <div className="md:w-1/2 w/full space-y-3">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      <div className="md:w-1/2 w/full space-y-3 card shrink-0 max-w-sm shadow-xl bg-base-100 px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Process your payment!</h2>
        <h5>Credit/Debit Card</h5>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            // disabled={!stripe}
            className="bg-blue-700 text-white w-full mt-6 mb-4 px-5 py-1 rounded-lg w/full"
            disabled={!stripe || isProcessing} // Disable while processing
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>

        {cardError && <div className="text-red text-sm">{cardError}</div>}

        <div className="mt-5 text-center">
          <hr />
          <button type="button" className="btn btn-sm mt-5 bg-red text-white">
            <FaPaypal /> Pay with PayPal
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
