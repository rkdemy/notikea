import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <>
      <PageHero title="checkout" />
      <Wrapper className="page">
        <h1>
          <StripeCheckout />
        </h1>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
