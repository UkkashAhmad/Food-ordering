"use client";

import toast from "react-hot-toast";
import { CartContext, cartProductPrice } from "../Components/AppContext.js";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../Components/Layout/SectionHeaders";
import Image from "next/image.js";
import Trash from "../Components/Icons/Trash.js";
import AddressInputs from "../Components/Layout/AddressInputs.js";
import { useProfile } from "../Components/UseProfile.js";
import CartProduct from '../Components/Menu/CartProduct.js'

function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();


  useEffect(() => {
    if(typeof window !== 'undefined'){
      if(window.location.href.includes('canceled=1')){
        toast.error('Payment failed')
      }
    }
  },[])

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postalCode, city, country } = profileData;
      const addressFormProfile = {
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      };
      setAddress(addressFormProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  //   FOR CALCULATING TOTAL AMOUNT
  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    //address and shopping cart products
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          const link = await response.json();
          window.location = link;
        } else {
          reject();
        }
      });
      // wee can type like this too
      // {// window.location = await response.json()}
    });

    await toast.promise(promise, {
        loading: "Preparing your order...",
        success:"Redirecting to payment",
        error: 'Something went wrong... Please try again later',
    })
  }

if(cartProducts?.length === 0 ){
  return (
    <section className="mt-8 text-center">
      <SectionHeaders mainHeader='Cart' />
      <p className="mt04">Your shopping cart is empty</p>
    </section>
  )
}


  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct key={index} product={product} onRemove={removeCartProduct} />
            ))}
          <div className="py-4 flex justify-end pr-16 items-center">
            <div className="text-gray-500">
              Subtotal: <br /> Delivery: <br /> Total:
            </div>
            <div className=" font-semibold pl-2 text-right">
              ${subtotal} <br /> $5 <br /> ${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <label className="font-semibold mb-2">Address</label>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
