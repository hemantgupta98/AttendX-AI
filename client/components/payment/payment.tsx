/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PayButton() {
  const handlePayment = async () => {
    const { data: order } = await axios.post("/api/create-order");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: "StackNova IN",
      description: "Service Fee",
      order_id: order.id,

      handler: async (response: any) => {
        const verifyRes = await axios.post("/api/verify-payment", response);

        if (verifyRes.data.success) {
          alert("Payment Successful ✅");
        } else {
          alert("Payment Failed ❌");
        }
      },

      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
}
