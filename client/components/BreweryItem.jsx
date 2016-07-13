import React from 'react';
import BreweryDetail from './BreweryDetail.jsx';
import BeerList from './BeerList.jsx';
import {Button, Modal} from 'react-bootstrap';
import $ from 'jquery';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         show: false,
         beers: null
      }
   }

   _getBeers() {
      $.ajax({
         url: '/brewery/beer',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({breweryId: this.props.breweryID}),
         dataType: 'json',
         success: beers => {
            if (beers.data) {
               this.setState({beers: beers.data});
               console.log('Beer List', this.props.breweryID, beers.data);
            }
         }
      });
   }

   render() {

      let close = () => this.setState({show: false});
      var self = this;
      return (

         <div className="list-group breweryList">
            <a className="list-group-item" onClick={() => this.setState({show: true})}>
               {this.props.name}
               <span className="distance pull-right">{`${this.props.distance} miles`}</span>
            </a>
            <Modal className='breweryDetail' show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">

               {/* Detail panel */}
               <Modal.Header closeButton>


                  <Modal.Title id="contained-modal-title">
                     <span className='title'>
                        {this.props.name}
                     </span>
                     <span className='address'>{!(this.props.address)
                           ? null
                           : this.props.address}</span>
                  </Modal.Title>



               </Modal.Header>


               <Modal.Body>
                  <a href={this.props.url} target='_blank'>
                     <img className='center-block img-circle' src={this.props.image || 'http://www.frenchtoastsunday.com/wp-content/uploads/2015/02/beer-icon.png'} alt={this.props.name}/>
                  </a>
                  <br/> {this.props.description || 'No description'}

                    {/* <BeerList breweryID={this.props.id}/> */}
                    {this._getBeers()}
                    <BeerList beers={self.props.beers}/>
               </Modal.Body>



               <Modal.Footer>
                  <div className='btn-group' role='group'>
                     <button type='button' className='btn btn-primary' onClick={(e) => {
                        e.preventDefault()
                     }}>
                        &larr; Prev
                     </button>
                     <button type='button' className='btn btn-primary heart' onClick={(e) => {
                        e.preventDefault()
                     }}>
                        &hearts;
                     </button>
                     {/*here is our state (test): {this.state.city}*/}
                     <button type='button' className='btn btn-primary' onClick={(e) => {
                        e.preventDefault()
                     }}>
                        Next &rarr;
                     </button>
                  </div>
               </Modal.Footer>



            </Modal>
         </div>
      );
   }
}
