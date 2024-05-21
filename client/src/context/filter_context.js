import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    free_shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_PRODUCTS", payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORT_PRODUCTS" });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: "SET_GRIDVIEW" });
  };

  const setListView = () => {
    dispatch({ type: "SET_LISTVIEW" });
  };

  const updateSort = (event) => {
    // const name = event.target.name;
    const value = event.target.value;
    dispatch({ type: "UPDATE_SORT", payload: value });
  };

  const updateFilters = (event) => {
    let search = event.target.name;
    let value = event.target.value;
    if (search === "category") {
      value = event.target.textContent;
    }
    if (search === "price") {
      value = Number(value);
    }
    if (search === "shipping") {
      value = event.target.checked;
    }
    dispatch({ type: "UPDATE_FILTERS", payload: { search, value } });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const ctx = {
    filtered_products: state.filtered_products,
    all_products: state.all_products,
    grid_view: state.grid_view,
    sort: state.sort,
    filters: state.filters,
    setGridView,
    setListView,
    updateSort,
    updateFilters,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={ctx}>{children}</FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
