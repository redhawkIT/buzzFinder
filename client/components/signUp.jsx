//import * as Auth from '../models/auth';
//import { Model } from 'react-bootstrap';
import React from 'react';
import $ from 'jquery'

export default class Signup extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: ''
      };
   }
     _signUp(attrs) {
      $.ajax({
         url: '/signup',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(attrs),
         dataType: 'json',
         success: function(){
            alert('success')
         },
         error: function(err){
            alert('error')
         }
      });
   }
   render() {
      return (
         <div>

            <form>
               <input className='input-large form-control' value={this.state.username} placeholder="Username..." onChange={(e) => this.setState({username: e.target.value})}/>
               <input className='input-large form-control' value={this.state.password} placeholder='Password...' onChange={(e) => this.setState({password: e.target.value})}/> uN:{this.state.username}
              pW:{this.state.password}

               <button onClick={(e) => this._signUp({username:this.state.username, password:this.state.password})} type='button' className='btn btn-primary'>Submit</button>
            </form>
         </div>
      );
   }
}
