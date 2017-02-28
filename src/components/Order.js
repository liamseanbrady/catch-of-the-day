import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const fishCount = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === "unavailable") {
      return (
        <li key={key}>Sorry, {fish ? fish.name : "fish"} is no longer available {removeButton}</li> 
      )
    }
    const total = fishCount * fish.price;
    return (
      <li key={key}>
        <span>{fishCount}lbs {fish.name}</span>
        <span className="price">{formatPrice(total)}</span>
        {removeButton}
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, key) => {
      const fish = this.props.fishes[key];
      const fishCount = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        acc += (fish.price * fishCount) || 0;
      }
      return acc;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>{formatPrice(total)}</strong>
          </li>
        </ul>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;
