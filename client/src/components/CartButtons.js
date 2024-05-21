import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

const CartButtons = () => {
  const { closeSideBar } = useProductsContext();
  const { total_quantity } = useCartContext();
  const { loginWithRedirect, myUser, logout } = useUserContext();

  const userLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSideBar}>
        Cart |
        <span className="cart-container">
          <FaShoppingCart />
          <span className={total_quantity > 0 ? "cart-value" : ""}>
            {total_quantity > 0 ? total_quantity : ""}
          </span>
        </span>
      </Link>

      {myUser ? (
        <button type="button" className="auth-btn" onClick={userLogout}>
          logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.2rem;
    letter-spacing: var(--spacing);
    color: var(--clr-primary-2);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    top: -11px;
    left: 18px;
    padding: 11px;
    background-color: var(--clr-primary-2);
    color: var(--clr-white);
  }
  .auth-btn {
    display: flex;
    justify-content: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--clr-primary-2);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
