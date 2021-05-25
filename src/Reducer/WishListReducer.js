export const wishListReducer = (state, action) => {
    switch (action.type) {
      case "Added":
        const AddedProduct = state.wishList.some(
          (item) => item.id === action.payload.id
        );
        if (AddedProduct) {
          return {
            ...state,
            wiishList: [...state.wishList],
            displayWishlistModal: true,
            wishlistModalContent: "Added to wishlist"
          };
        } else {
          return {
            ...state,
            wishList: [...state.wishList, action.payload],
            displayWishlistModal: true,
            wishlistModalContent: "Added to wishlist"
          };
        }
  
      case "Remove":
        const newWishList = state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: newWishList,
          displayWishlistModal: true,
          wishlistModalContent: "Removed from wishlist"
        };
  
      case "MoveToCart":
        const newWishListItem = state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: newWishListItem,
          displayWishlistModal: true,
          wishlistModalContent: "Moved to cart"
        };
      default:
    }
  };
  