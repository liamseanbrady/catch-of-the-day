import React from "react";
import AddFishForm from "./AddFishForm";

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
  }

  handleChange(event, key) {
    const fish = this.props.fishes[key];
    const updatedFish = { ...fish, [event.target.name]: event.target.value };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" placeholder="Fish name" defaultValue={fish.name} onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" placeholder="Fish price" defaultValue={fish.price} onChange={(e) => this.handleChange(e, key)} />
        <select name="status" defaultValue={fish.status} onChange={(e) => this.handleChange(e, key)} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" defaultValue={fish.desc} placeholder="Fish description" onChange={(e) => this.handleChange(e, key)} ></textarea>
        <input type="text" name="image" placeholder="Fish image" defaultValue={fish.image} onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key, fish)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Inventory</h1>
        {
          Object.keys(this.props.fishes).map(this.renderInventory)
        }
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Samples</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
