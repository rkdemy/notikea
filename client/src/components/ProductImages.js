import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = ({ image = [{ url: "" }] }) => {
  const [main, setMain] = useState(image[0]);

  return (
    <Wrapper>
      <img src={main.url} alt="main" className="main" />
      <div className="gallery">
        {image.map((item, index) => {
          return (
            <img
              key={index}
              alt={item.filename}
              src={item.url}
              onClick={() => setMain(image[index])}
              className={`${item.url === main.url && "blur"}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  .blur {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
