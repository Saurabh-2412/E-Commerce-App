export const wishListReducer = (state, action) => {
    switch (action.type) {
      case "Added":
        const AddedProduct = state.wishList.some(
          (item) => item.id === action.payload.id
        );
        if (AddedProduct) {
          return {
            ...state,
            wiishList: [...state.wishList]
          };
        } else {
          return {
            ...state,
            wishList: [...state.wishList, action.payload]
          };
        }
  
      case "Remove":
        const newWishList = state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: newWishList
        };
  
      case "MoveToCart":
        const newWishListItem = state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: newWishListItem
        };
      default:
    }
  };
  