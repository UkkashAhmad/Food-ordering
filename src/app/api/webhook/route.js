// this one is for redirecting so user can know his order is successfull
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text()
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("stripe error");
    console.log(e)
    return Response.json(e, { status: 400 });
  }

if (event.type === 'checkout.session.completed'){
    console.log(event);
    console.log({'orderId':event?.metadata?.orderId})
}
  return Response.json('ok', {status: 200})
}
