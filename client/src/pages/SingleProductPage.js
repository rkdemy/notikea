import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { pId } = useParams();
  const {
    single_product: product,
    single_product_loading: loading,
    single_product_error: error,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(pId);
  }, [pId]);

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id,
    company,
    images,
  } = product;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Wrapper>
        <PageHero title={name} product />
        <div className="section section-center page">
          <Link onClick={goBack} className="btn">
            Back
          </Link>
          <div className="product-center">
            <ProductImages image={images} />
            <section className="content">
              <h2>{name}</h2>
              <Stars stars={stars} reviews={reviews} />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Available: </span>
                {stock > 0 ? "In Stock" : "Out of stock"}
              </p>
              <p className="info">
                <span>SKU: </span>
                {id}
              </p>
              <p className="info">
                <span>Brand: </span>
                {company}
              </p>
              <hr />
              {stock > 0 && <AddToCart product={product} />}
            </section>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
