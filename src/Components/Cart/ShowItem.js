export function ShowItem({ item, SetItemsInCart }) {
  function AddAndDec(opp) {
    if (opp === "Increment") {
      SetItemsInCart((itincart) => itincart.map((it) => {
        if (it.id === item.id) {
          return {
            ...it,
            quantity: it.quantity + 1
          };
        }
        return it;
      })
      );
    } else if (opp === "Decrement") {
      SetItemsInCart((itincart) => itincart.map((it) => {
        if (it.id === item.id && it.quantity !== 0) {
          return {
            ...it,
            quantity: it.quantity - 1
          };
        } else {
          return { ...it };
        }
        // return it;
      })
      );
    } else if (opp === "Remove") {
      SetItemsInCart((itincart) => itincart.filter((element) => element.id !== item.id)
      );
    }
  }

  function TotalPrice(item) {
    return item.price * item.quantity;
  }

  return (
      <div key={item.id} className="card horizontal">
        <img src={item.image} alt={item.image} />
        <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <div className="card-text">
                <p>Price : {item.price}</p>
                <p>IdealFor : {item.idealFor}</p>
                <p>Color : {item.color}</p>
                <p>Quantity :{item.quantity}
                  <button onClick={() => AddAndDec("Increment")}>+</button>
                  <button onClick={() => AddAndDec("Decrement")}>-</button>
                </p>
                <button onClick={() => AddAndDec("Remove")}>Remove</button>
                <br />
                <br />
                <hr></hr>
                <div>
                  Total Price :{TotalPrice(item) ? <span> {TotalPrice(item)}</span> : 0}
                </div>
            </div>
        </div>
      </div>
  );
}