import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/create-payment-intent`,
        { cart, shipping_fee, total_amount },
        { headers: { "Content-Type": "application/json" } }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line
  }, [cart]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 10000);
    }
  };
  return (
    <CheckoutContainer>
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>
            Your total is {formatPrice(total_amount + shipping_fee)} plus
            shipping
          </p>
          {cart.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </article>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dashboard
          </a>
          . Refresh the page to pay again.
        </p>
      </form>
    </CheckoutContainer>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
`;

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  width: 100%;

  article {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 1;
  }

  form {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 1;
  }

  h4 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
  }

  #card-element {
    background: #fff;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #d1d1d1;
    margin-bottom: 1rem;
  }

  #submit {
    background: #5469d4;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s ease-in-out;
  }

  #submit:hover {
    background: #4351b1;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    top: -0.2px;
    left: -0.2px;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    top: -0.1px;
    left: 10.2px;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .card-error {
    color: #fa755a;
    text-align: center;
    font-size: 1rem;
    margin-top: 12px;
  }

  .result-message {
    line-height: 22px;
    font-size: 16px;
    text-align: center;
    margin-top: 12px;
  }

  .result-message a {
    color: #5469d4;
    font-weight: 600;
    text-decoration: none;
  }

  .hidden {
    display: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export default StripeCheckout;
