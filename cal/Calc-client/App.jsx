import React from 'react';
import axios from 'axios';

class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data :{
                        result:0
                    }
            };
            this.calculateAction = this.calculateAction.bind(this);
        }
        calculateAction(id){
            debugger;
            var newState = this.state;  
            console.log(newState);
            var self = this;
            axios.get('http://localhost:4000/calculate/' + document.getElementById("value1").value + "/" + document.getElementById("value2").value+ "/" + id)
                      .then(function (response) {
              
                        newState.data.result = response.data.result;
           
                
                        console.log(newState);
                       self.setState(newState);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
            }
        render() {

             return (
                <div>
                     <div><h4>My calculator</h4></div>
                <br></br>
                <p><span>Input 1:</span><input type="number" id="value1" name="value1"></input></p>
                    <br></br>
                <p><span>Input 2:</span><input type="number" id="value2" name="value2"></input></p>
                    <br></br>
                <p><span>Output:</span><span>{this.state.data.result}</span></p>
                
                     <div class="a">
                     <button type="button" className="btn btn-primary col-sm-3"  id="popupclose" onClick={()=>this.calculateAction(1)} value="Close">Addition</button>
                         </div>
                     <div  class="row">
                           <button type="button" className="btn btn-primary col-sm-3"  id="popupclose" onClick={()=>this.calculateAction(2)} value="close">Subtraction</button></div>
                     <div  class="row">  <button type="button" className="btn btn-primary col-sm-5"  id="popupclose" onClick={()=>this.calculateAction(3)} value="close">Multiplication</button></div>
                     <div class="row">  <button type="button" className="btn btn-primary col-sm-6"  id="popupclose" onClick={()=>this.calculateAction(4)} value="close">Division</button></div>
                     
                
                </div>
                 );
            }    
}
export default App;