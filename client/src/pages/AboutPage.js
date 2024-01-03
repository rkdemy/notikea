import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/renczz_lofi_art_bedroom_with_study_corner_946fdbc6-b565-4be8-8734-95b8c3d4b6aa.png";

const AboutPage = () => {
  return (
    <>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="lofi room" />
        <article className="about-text">
          <div className="title">
            <h2>Our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Welcome to NOT IKEA! We are a team of passionate individuals
            dedicated to providing high-quality and stylish furniture pieces for
            your home or office. Our company was founded with the goal of making
            furniture shopping easy and enjoyable for everyone. We understand
            that furniture is an important investment and plays a significant
            role in your daily life. That's why we offer a wide selection of
            furniture pieces to fit every taste, style, and budget. Our team
            consists of experienced designers, craftsmen, and customer service
            representatives who work together to create beautiful and functional
            furniture that meets your needs. We use only the finest materials
            and the latest technology to ensure that our furniture is durable,
            comfortable, and sustainable. Whether you're furnishing a small
            apartment or a large office, we have everything you need to create
            the perfect environment.
          </p>
        </article>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-top: 2rem;
    margin: 1rem auto;
    color: var(--clr-grey-1);
  }
  .title {
    text-align: center;
  }
  .underline {
    margin: 0rem auto;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    .title {
      margin-top: 3rem;
      text-align: left;
    }
    .underline {
      margin-left: 0;
    }
    p {
      margin: 1rem 0;
    }
  }
`;
export default AboutPage;
