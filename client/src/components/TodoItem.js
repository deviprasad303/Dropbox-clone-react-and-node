import React, {Component} from 'react';
import {connect} from 'react-redux';

import {doneTodo} from "../actions/index";

class TodoItem extends Component {

    render() {

        const {item} = this.props;

        const todoClass = `alert alert-${item.status === 'done' ?  "success" : "danger"}`;

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-12">
                    <div className={todoClass} role="alert">
                        { item.todo }
                        { item.status === 'active' ? (
                            <button
                                className="close"
                                onClick={() => {
                                    this.props.doneTodo(item.todo);
                                }}
                            ><span aria-hidden={true}>&times;</span></button>) : ''}
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
