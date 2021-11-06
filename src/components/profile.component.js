import React from 'react';
import { useSelector } from "react-redux";

function Profile() {
    var authLevel = useSelector((state) => state.authLevel);
    var user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card mx-auto d-block"
                    />
                </div>
                <div className="col-sm-9">
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <td><b>Id:</b>{user.id}</td>
                            </tr>

                            <tr>
                                <td><b>Username:</b>{user.username}</td>
                            </tr>
                            <tr>
                                <td><b>Email:</b>{user.email}</td>
                            </tr>
                            <tr>
                                <td><b>Display Name:</b>{user.displayname}</td>
                            </tr>
                            <tr>
                                <td><b>Roles:</b>{user.roles[0]},{user.roles[1]},{user.roles[2]}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Profile;