import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const myPubKey = process.env.NEXT_PUBLIC_STRIPE_PUB_KEY;

const getStripe = () => {
  if (!stripePromise) {
    //load Stripe from my public key
    stripePromise = loadStripe(myPubKey);
  }
  return stripePromise;
};

export default getStripe;
