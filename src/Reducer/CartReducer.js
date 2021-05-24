export const cartReducer = (state, action) => {
    switch (action.type) {
      case "Added":
        if (state.cartList.some((item) => item.id === action.payload.id)) {
          const increasedQuantity = state.cartList.map((item) => {
            console.log(item.id);
            return item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
          return {
            ...state,
            cartList: increasedQuantity
          };
        } else {
          return {
            ...state,
            cartList: [...state.cartList, action.payload]
          };
        }
  
      case "Increment":
        const increasedQuantity = state.cartList.map((item) => {
          console.log(item.id);
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
        return {
          ...state,
          cartList: increasedQuantity
        };
  
      case "Decrement":
        if (action.payload.quantity > 1) {
          const decreasedQuantity = state.cartList.map((item) => {
            console.log(item.id);
            return item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          });
          return {
            ...state,
            cartList: decreasedQuantity
          };
        } else {
          const filteredCartList = state.cartList.filter(
            (product) => product.id !== action.payload.id
          );
          return {
            ...state,
            cartList: filteredCartList
          };
        }
  
      case "Remove":
        const newCartList = state.cartList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          cartList: newCartList
        };
  
      case "MoveToCart":
        if (state.cartList.some((item) => item.id === action.payload.id)) {
          const MovedItem = state.cartList.map((item) => {
            return item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
          return {
            ...state,
            cartList: MovedItem
          };
        } else {
          return {
            ...state,
            cartList: [...state.cartList, action.payload]
          };
        }
      default:
    }
  };
  