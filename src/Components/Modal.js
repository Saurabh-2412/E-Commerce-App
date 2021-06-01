export const Modal = ({ modalContent }) => {
  //console.log("model context", modalContent)
  return (
    <div className="snackbar">
      <p className="snackbar--message">{modalContent}</p>
    </div>
  );
};

export const CartModal = ({ cartModalContent }) => {
  //console.log("model context", cartModalContent)
  return (
    <div className="snackbar">
      <p className="snackbar--message">{cartModalContent}</p>
    </div>
  );
};

export const WishListModal = ({ wishlistModalContent }) => {
  //console.log("model context", wishlistModalContent)
  return (
    <div className="snackbar">
      <p className="snackbar--message">{wishlistModalContent}</p>
    </div>
  );
};