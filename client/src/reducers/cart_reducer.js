import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, quantity, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          let newQuantity = cartItem.quantity + quantity;
          if (newQuantity > cartItem.maxQuantity) {
            newQuantity = cartItem.maxQuantity;
          }
          return { ...cartItem, quantity: newQuantity };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id,
        name: product.name,
        quantity,
        image: product.images[0].url,
        price: product.price,
        maxQuantity: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_quantity, total_amount } = state.cart.reduce(
      (accum, currVal) => {
        let { quantity, price } = currVal;
        accum.total_quantity += quantity;
        accum.total_amount += price * quantity;
        return accum;
      },
      {
        total_quantity: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_quantity, total_amount };
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increase") {
          let newQuantity = item.quantity + 1;
          if (newQuantity > item.maxQuantity) {
            newQuantity = item.maxQuantity;
          }
          return { ...item, quantity: newQuantity };
        }

        if (value === "decrease") {
          let newQuantity = item.quantity - 1;
          if (newQuantity < 1) {
            newQuantity = 1;
          }
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
