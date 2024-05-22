import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSideBarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],

  single_product: [],
  single_product_loading: false,
  single_product_error: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Open menu
  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  // Close menu
  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // Fetch Products API
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/products`
      );
      const products = response.data; // Access data directly
      console.log(products);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Fetch Products on Load
  useEffect(() => {
    fetchProducts();
  }, []);

  //Fetch Single Product
  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/single-products?id=${id}`
      );
      const product = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const ctx = {
    toggleSide: state.isSideBarOpen,
    products_loading: state.products_loading,
    products_error: state.products_error,
    products: state.products,
    featured_products: state.featured_products,

    single_product: state.single_product,
    single_product_loading: state.single_product_loading,
    single_product_error: state.single_product_error,

    openSideBar,
    closeSideBar,
    fetchSingleProduct,
  };

  return (
    <ProductsContext.Provider value={ctx}>{children}</ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
