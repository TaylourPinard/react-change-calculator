import React, { Component } from 'react';
class Card extends Component{
  constructor(props){
      super(props);
  }
  
  render(){
    return(
      <div className="col-md-3">
        <div className="card" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.title}</h5>
            <p className="text-center change">{this.props.quantity}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Card;