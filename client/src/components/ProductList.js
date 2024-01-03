import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    filtered_products,
    all_products: products,
    grid_view,
  } = useFilterContext();

  if (products.length < 1) {
    <h5 style={{ textTransform: "none" }}>
      Sorry, no products matched you search...
    </h5>;
  }

  if (grid_view === false) {
    return <ListView products={products} />;
  }

  return <GridView products={filtered_products}>product list</GridView>;
};

export default ProductList;
