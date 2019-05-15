import React, { Component } from 'react';
import Card from './card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: '',
      amountRecieved: '',
      change: null,
      alertMessage: '',
      twenties: null,
      tens: null,
      fives: null,
      ones: null,
      quarters: null,
      dimes: null,
      nickels: null,
      pennies: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  calculate(amountDue, amountReceived) {
    let changeDue = amountReceived - amountDue;
    changeDue = changeDue.toFixed(2);
    this.setState({ 
      change: changeDue,
      alertMessage: `The total change due is $${changeDue}`
    });
    let changeGiven = [null,null,null,null,null,null,null,null];
    if(changeDue < 0) return;
    const denoms = ["twenties", "tens", "fives", "ones", "quarters", "dimes", "nickels", "pennies"];
    const values = [20, 10, 5, 1, .25, .1, .05, .01];
    var amountPerDenom;
    for (var i = 0; i < values.length; i++) {
      amountPerDenom = changeDue / values[i];
      amountPerDenom = Math.floor(amountPerDenom);
      if (amountPerDenom > 0) {
        let denom = denoms[i];
        this.setState({ [denom]: amountPerDenom })
        changeDue = changeDue % values[i];
        changeDue = changeDue.toFixed(2);
        changeGiven[i] = amountPerDenom;
      } else {
        let denom = denoms[i];
        this.setState({ [denom]: amountPerDenom })
        changeGiven[i] = amountPerDenom;
      }
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 style={{ color: '#ffffff' }}>Change Calculator</h1>
        </header>
        <div id="tagline">
          <p></p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enter Information</h5>
                <div className="form-group">
                  <label htmlFor="amountDue">How much is due?</label>
                  <input name="amountDue" id="amountDue" type="number" className="form-control" value={this.state.amountDue} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="amountReceived">How much was received?</label>
                  <input name="amountReceived" id="amountRecieved" type="number" className="form-control" value={this.state.amountReceived || ''} onChange={this.handleInputChange} />
                </div>
                <button className="btn btn-primary btn-block" disabled={!this.state.amountDue || !this.state.amountReceived} onClick={() => this.calculate(this.state.amountDue, this.state.amountReceived)}>Calculate</button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card" style={{ padding: '20px' }}>
              <div className={(this.state.change != null && this.state.change > 0) ? 'alert alert-success' : 'alert alert-danger'}>{this.state.alertMessage}</div>
              <div className="row" style={{ paddingBottom: '20px' }}>
                <Card title="Twenties" quantity={this.state.twenties} />
                <Card title="Tens" quantity={this.state.tens} />  
                <Card title="Fives" quantity={this.state.fives} />  
                <Card title="Ones" quantity={this.state.ones} />
              </div>
              <div className="row">
                <Card title="Quarters" quantity={this.state.quarters} />
                <Card title="Dimes" quantity={this.state.dimes} />
                <Card title="Nickels" quantity={this.state.nickels} />
                <Card title="Pennies" quantity={this.state.pennies} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
