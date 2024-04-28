import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../hooks/useCart";

function Payment() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  const [cart] = useCart();

  //   Calculate prices
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));

  return (
    <div className="section-container mt-5  min-h-screen">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
}

export default Payment;
