export const cartReducer = (state, action) => {
    switch (action.type) {
      case "Loading":
        return {
          ...state,
          cartList: action.payload,
          //displayCartModal: true,
          //cartModalContent: "Loading cart items"
        };
      case "Added":
        if (state.cartList.some((item) => item.id === action.payload.id)) {
          const increasedQuantity = state.cartList.map((item) => {
            //console.log(item.id);
            return item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
          return {
            ...state,
            cartList: increasedQuantity,
            displayCartModal: true,
            cartModalContent: "Already exist in cart"
          };
        } else {
          return {
            ...state,
            cartList: action.payload,
            displayCartModal: true,
            cartModalContent: "Added to cart"
          };
        }

      case "AlreadyExist":
        return {
          ...state,
          displayCartModal: true,
          cartModalContent: "Item Already exist in cart"
        }
  
      case "Increment":
        const increasedQuantity = state.cartList.map((item) => {
          //console.log(item.id);
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
        return {
          ...state,
          cartList: increasedQuantity,
          displayCartModal: true,
          cartModalContent: "Quantity Increased"
        };
  
      case "Decrement":
        if (action.payload.quantity > 1) {
          const decreasedQuantity = state.cartList.map((item) => {
            //console.log(item.id);
            return item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          });
          return {
            ...state,
            cartList: decreasedQuantity,
            displayCartModal: true,
            cartModalContent: "Quantity Decreased"
          };
        } else {
          const filteredCartList = state.cartList.filter(
            (product) => product.id !== action.payload.id
          );
          return {
            ...state,
            cartList: filteredCartList,
            displayCartModal: true,
            cartModalContent: "Removed from cart"
          };
        }
  
      case "Remove":
        //console.log("from remove", action.payload);
        // const newCartList = state.cartList.filter(
        //   (product) => product.id !== action.payload.id
        // );
        //console.log("from remove reducer",newCartList)
        return {
          ...state,
          cartList: action.payload,//newCartList
          displayCartModal: true,
          cartModalContent: "Removed from cart"
        };

      case "DISPLAY_MODAL":
        //console.log("display modal from cart reducer")
        return {
          ...state,
          displayCartModal: false,
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
            cartList: MovedItem,
            //displayCartModal: true,
            //cartModalContent: "Moved to cart"
          };
        } else {
          return {
            ...state,
            cartList: [...state.cartList, action.payload],
            //displayCartModal: true,
            //cartModalContent: "Moved to cart"
          };
        }
      default:
    }
  };
  