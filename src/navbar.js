import React, { Component } from "react";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handlesubmit(this.state.value);
  }

  // add event listener for enter keypress that filters through array and updates the array with movies that match the search term.

  render() {
    return (
      <div>
        <nav>
          <div className="d-flex justify-content-around">
            <h1 className="align-center">Movie App</h1>
            <form onSubmit={this.handleSubmit}>
              <input className="mt-3"
                type="text"
                placeholder="search"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button>Submit</button>
            </form>
            {/* <button onClick={props.toggleApiClick}>Toggle Source</button> */}
          </div>
        </nav>
      </div>
    );
  }
}
