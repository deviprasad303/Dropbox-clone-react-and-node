import React, {Component} from 'react';
import {connect} from 'react-redux';

import {doneTodo} from "../actions/index";

class TodoItem extends Component {

    render() {

        const {item} = this.props;

        const todoClass = `alert alert-${item.status === 'add' ?  "success" : "danger"}`;

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-12">

                    <div className={todoClass}   role="alert" id ='one'>
                        <div className="row" >
                            <div className="col-md-6">
                            <h5>{ item.todo }</h5>
                                <div >
                                    { localStorage[item.todo+' price']} USD
                                </div >


                            </div>

                        </div>




                            <button
                                className="col-md-2"
                                onClick={() => {
                                    var e = document.getElementById('one');

                                    if (typeof(Storage) !== "undefined"){
                                        if (localStorage[item.todo]) {
                                            localStorage[item.todo] = Number(localStorage[item.todo])+1;
                                        } else {
                                            localStorage[item.todo] = 1;
                                        }
                                    }
                                    this.props.doneTodo(item.todo);
                                }}
                            >Add</button>

                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doneTodo : (data) => dispatch(doneTodo(data))
    };
}

export default connect(null, mapDispatchToProps)(TodoItem);    // Learn 'Currying' in functional programming
