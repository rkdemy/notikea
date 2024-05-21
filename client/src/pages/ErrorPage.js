import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "../components";

const ErrorPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper className="page-100">
        <section>
          <h1>404</h1>
          <h3>Sorry, the page cannot be found</h3>
        </section>
        <Link onClick={goBack} className="btn">
          Go Back
        </Link>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 8rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
