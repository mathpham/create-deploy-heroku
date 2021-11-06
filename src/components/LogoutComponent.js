import React from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../actions/isLogin';
function LogoutComponent(props) {
    function cancel(){
        props.history.push("/");
    }
    const dispatch = useDispatch();
    function logout(){
        dispatch(signout());
        props.history.push("/login");
    }
    return (
        <div className = "row">
            <div className = "col-sm-4"></div>
            <div className = "col-sm-4">
                <h3>Are you sure?</h3>
                <br/>
                <button type="button" className="btn btn-secondary" onClick = {cancel} >Cancel</button>
                <button type="button" className="btn btn-primary" onClick = {logout}>Logout</button>
            </div>
            <div className = "col-sm-4"></div>
        </div>
    );
}

export default LogoutComponent;