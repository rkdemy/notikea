import React, { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const { id, stock } = product;

  const increase = () => {
    setQuantity((oldQuantity) => {
      let tempQuantity = oldQuantity + 1;
      if (tempQuantity > stock) {
        tempQuantity = stock;
      }
      return tempQuantity;
    });
  };

  const decrease = () => {
    setQuantity((oldQuantity) => {
      let tempQuantity = oldQuantity - 1;
      if (tempQuantity < 1) {
        tempQuantity = 1;
      }
      return tempQuantity;
    });
  };

  const addItem = () => {
    addToCart(id, quantity, product);
  };

  return (
    <Wrapper>
      <div className="btn-container">
        <AmountButtons
          amount={quantity}
          increase={increase}
          decrease={decrease}
        />
        <button className="btn" onClick={addItem}>
          add to cart
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
