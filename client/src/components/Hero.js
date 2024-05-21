import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heroBcg from "../assets/renczz_lofi_art_bedroom_with_study_corner_74dc34ba-e247-47f1-a394-77c295b7e237.png";
import heroBcg2 from "../assets/renczz_lofi_art_bedroom_with_study_corner_946fdbc6-b565-4be8-8734-95b8c3d4b6aa.png";
import { useProductsContext } from "../context/products_context";
import Loading from "./Loading";
import Error from "./Error";
const Hero = () => {
  const { featured_products: featured } = useProductsContext();

  return (
    <>
      <Wrapper className="section-center">
        <article className="content">
          <h1 className="gradient-text">design your comfort zone</h1>
          <p>
            We understand that furniture is an important investment and plays a
            significant role in your daily life. That's why we offer a wide
            selection of furniture pieces to fit every taste, style, and budget.
          </p>
          <Link to="/products">
            <button>
              <span className="span-mother">
                <span>E</span>
                <span>x</span>
                <span>p</span>
                <span>l</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </span>
              <span className="span-mother2">
                <span>E</span>
                <span>x</span>
                <span>p</span>
                <span>l</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </span>
            </button>
          </Link>
        </article>
        <article className="img-container">
          <div className="img-container_1">
            {/* <h3>We lower prices where we can</h3> */}
            {featured.slice(0, 4).map((product, index) => {
              return (
                <Link to={`/products/${product.id}`} key={index}>
                  <img
                    src={product.image}
                    key={product.name}
                    alt="featured furniture"
                    className="main-img"
                  />
                </Link>
              );
            })}
          </div>
        </article>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  /* Button Animation and CSS */
  button {
    cursor: pointer;
    font-weight: bold;
    color: var(--clr-primary-2);
    border-radius: 2rem;
    width: 100px;
    height: 43px;
    border: none;
    background-color: transparent;
    border: 2px solid var(--clr-primary-2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
  }

  button:hover .span-mother {
    position: absolute;
  }

  button:hover .span-mother span {
    transform: translateY(1.2em);
  }

  button .span-mother span:nth-child(1) {
    transition: 0.2s;
  }

  button .span-mother span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother span:nth-child(5) {
    transition: 0.6s;
  }

  button .span-mother span:nth-child(6) {
    transition: 0.7s;
  }
  button .span-mother span:nth-child(7) {
    transition: 0.8s;
  }

  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
  }

  button .span-mother2 span {
    transform: translateY(-1.2em);
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }

  button .span-mother2 span {
    transition: 0.2s;
  }

  button .span-mother2 span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother2 span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother2 span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother2 span:nth-child(5) {
    transition: 0.6s;
  }

  button .span-mother2 span:nth-child(6) {
    transition: 0.7s;
  }
  button .span-mother2 span:nth-child(7) {
    transition: 0.8s;
  }
  /* End of Button */

  .gradient-text {
    color: var(--clr-primary-2);
  }

  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-1);
    font-size: 1rem;
  }

  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;

    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 25%;
    }

    .img-container {
      display: flex;
      position: relative;
    }
    .img-container_1 img {
      height: 330px;
      width: 240px;
      margin: 0.5rem;
    }
    .img-container_1 h3 {
      font-size: 1rem;
      width: 240px;
      height: 240px;
      margin: 0.5rem;
      background-color: red;
      color: white;
    }

    .img-container_2 img:nth-child(1) {
      height: 330px;
      width: 240px;
      margin: 0.5rem;
    }

    .main-img {
      width: 100%;
      position: relative;
      object-fit: cover;
    }
  }
`;

export default Hero;
