/**
 * Created by devi on 9/26/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from "../actions/index";
import {doneTodo} from "../actions/index";


class TodoItem extends Component {

    render() {

        const {item} = this.props;

        const todoClass = `alert alert-${item.status === 'add' ?  "success" : "danger"}`;

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-12">

                    <div className={todoClass}    style ={{display: (item.status === 'add' )? 'block' : 'none' }}  >
                        <div className="row" >
                            <div className="col-md-6">
                                <button
                                    className="close"
                                    onClick={() => {
                                        if (typeof(Storage) !== "undefined"){
                                            if (localStorage[item.todo]) {
                                                localStorage[item.todo] = 0;
                                            } else {
                                                localStorage[item.todo] = 0;
                                            }
                                        }
                                        this.props.addTodo(item.todo);
                                    }}
                                ><span aria-hidden={true}>&times;</span></button>
                                <h5>{ item.todo }</h5>

                                <div >
                                    { localStorage[item.todo+' price']} USD
                                    { localStorage[item.todo]} units
                                </div >




                            </div>

                        </div>






                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doneTodo : (data) => dispatch(doneTodo(data)),
        addTodo:(data) => dispatch(addTodo(data)),
    };
}

export default connect(null, mapDispatchToProps)(TodoItem);    // Learn 'Currying' in functional programming
