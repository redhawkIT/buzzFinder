import React from 'react';
import ReactDOM from 'react-dom';
import BreweryList from './BreweryList.jsx';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import AuthButton from './AuthButton.jsx'

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         term: '',
         brewerys: [],
         latitude: 0,
         longitude: 0
      }

   }

   _getLocation() {
      // get location from client Browser (HTML5 funciton)
      if ('geolocation' in navigator) {
         this._requestLocation();
      } else {
         console.log("Browser doesn't support geolocation");
      }
   }

   _requestLocation() {
      const options = {
         enableHighAccuracy: false,
         timeout: 5000,
         maximumAge: 0
      };
      // call HTML5 funciton, passing the coords object (this) to _success()
      navigator.geolocation.getCurrentPosition(this._success.bind(this), error, options);
      const error = (err) => console.log('error ', err);
   }

   _success(pos) {
      this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
      console.log('Lat', this.state.latitude, 'long', this.state.longitude)

      // send coords obj to server
      // server makes api call for brewery by location
      $.ajax({
         url: '/location',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({latitude: this.state.latitude, longitude: this.state.longitude}),
         dataType: 'json',
         success: this._fetchBrewerysByLocation.bind(this)
      });
   }

   // setState with brewery data
   _fetchBrewerysByLocation(brewerys) {
      this.setState({brewerys: brewerys.data});
      console.log(" brewerys.data", brewerys.data)
      // we now can use this data in the child components
      // this.props.brewerys
   }

   render() {
      return (
         <div className="container App">
            <div className="row">
               <div className='col-sm-7 col-sm-offset-5 heading'>
               <div className='col-sm-8'>
               <h1>Local Craft Brews</h1>
               <h4>The Only Source for Craft Beer</h4>
               </div>
                  <AuthButton/>
               </div>
            </div>
            <div className='row'>
               <div className='col-sm-7 col-sm-offset-5'>
                  {/*{ Create search box and add two-way bindings }*/}
                  <form>
                     <input className='input-large form-control' value={this.state.term} onKeyPress={(e) => this.test(e)} onChange={(e) => this.setState({term: e.target.value})} type='text' placeholder='Search by city.....'/>
                     <div className='btn-group' role='group'>
                        <button type='button' className='btn btn-primary' onClick={(e) => e.preventDefault()}>
                           Search
                        </button>
                        {/*here is our state (test): {this.state.term}*/}
                        <button type='button' className='btn btn-primary' onClick={() => this._getLocation()}>Use current location</button>
                     </div>
                  </form>
                  <BreweryList/>
                  <h1>List Here</h1>
               </div>
            </div>
         </div>
      );
   }
   test(e) {
      if (e.key === 'Enter')
         alert('they pressed enter we will search by provided city');
      }
   }
