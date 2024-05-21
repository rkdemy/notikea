import React from "react";
import styled from "styled-components";

const Contact = () => {
  const emailHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <div className="section-center">
        <h3>Join our newsletter and get 20% off</h3>
        <div className="content">
          <p>
            As our fleet of cabins grow, we will have more locations and tiny
            cabins to experience. Keep in the loop and be the first to look and
            first to book new & exisiting cabins and be inspired by
            cabin-living.
          </p>
          <form className="contact-form" onSubmit={emailHandler}>
            <input
              type="email"
              className="form-input"
              placeholder="enter email"
            />
            <button className="submit-btn">Send</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  background-color: white;
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-1);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }

  @media (min-width: 992px) {
    h3 {
      font-size: 1.5rem;
    }
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
  @media (min-width: 1162px) {
    h3 {
      font-size: 2.4rem;
    }
  }
`;

export default Contact;
