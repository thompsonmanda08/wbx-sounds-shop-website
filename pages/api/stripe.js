import React from "react";
import Stripe from "stripe";

const mySecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

//initialize a Stripe session from secret key
const stripe = new Stripe(mySecretKey);

export default async function handler(req, res) {
  //req => REQUEST and res => RESPONSE
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1L14mqJwgDvwxbB902USQZne" },
          { shipping_rate: "shr_1L14mMJwgDvwxbB9kDPHZGNm" },
          { shipping_rate: "shr_1L14lHJwgDvwxbB98CWPvs58" },
        ],

        //IDENTIFYING THE CART ITEMS TO BE SOLD AND META DATA TO USE
        line_items: req.body.map((item) => {
          const imgUrl = item.image[0].asset._ref;
          // WE NEED TO BUILD A PROPER URL FOR OUR IMAGES
          const newImageUrl = imgUrl
            .replace(
              "image-",
              "https://cdn.sanity.io/images/33z1to07/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImageUrl],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
          };
        }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
