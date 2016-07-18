import React from 'react';
import BreweryItem from './BreweryItem.jsx';
import $ from 'jquery';
import Loader from './loadingComponent.jsx';
const request = require('request');

export default class BreweryList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         brewerys: null
      }
   }

   componentDidMount() {
      this._fetchLocation();
   }

   render() {
      return (
         <div className='breweryList'>
            {this._createBreweryComponents()}
         </div>
      )
   }

   _fetchLocation() {
      // get latitude and longitude using IP address
      const self = this;
      request('http://ip-api.com/json', function(error, response, body) {
         if (!error && response.statusCode == 200) {
            const IP = JSON.parse(body);
            console.log('BreweryList -> _fetchLocation', IP.lat, IP.lon);
            self._success(IP);
         }
      });
   }

   _success(IP) {
      // send location to server
      const self = this;
      $.ajax({
         url: '/location',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({latitude: IP.lat, longitude: IP.lon}),
         dataType: 'json',
         success: (brewerys) => self.setState({brewerys: brewerys.data})
      });
   }

   _createBreweryComponents() {
      //  map brewerys data -> create BreweryItem for each brewery
      if (this.state.brewerys) {
         return this.state.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images).map((beer, index) => {
            return <BreweryItem
              key={index}
              url={beer.brewery.website}
              name={beer.brewery.name} 
              address={beer.streetAddress}
              zipcode={beer.postalCode}
              distance={beer.distance}
              type={beer.locationType}
              icon={beer.brewery.images.icon}/>
         });
      } else {
         return <Loader />
      }

   }
}
