import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTodo} from "../actions/index";

import TodoItem from "./TodoItem";


class MyToDo extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <h2 className="text-center">My Todos</h2>
                    </div>

                </div>
                <hr/>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                ref={(input) => this.input = input}
                                type="text"
                                placeholder="Enter a Todo"
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                this.props.addTodo(this.input.value)
                            }}
                        >Add</button>
                    </div>
                </div>

                <hr/>
                <div className="row justify-content-md-center">
                    <div className="card col-md-6">
                        <div className="card-body">
                            {
                                this.props.todoArr.map((todo,index) => {
                                    return(
                                        <TodoItem
                                            key={index}
                                            item={todo}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(todos) {
    const todoArr = Object.keys(todos).map((item) => (
        {
            'todo' : item,
            'status' : todos[item]
        }
    ));
    return {todoArr};
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo : (data) => dispatch(addTodo(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyToDo);    // Learn 'Currying' in functional programming
