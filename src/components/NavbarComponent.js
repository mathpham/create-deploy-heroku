import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { signout } from '../actions/isLogin';

function NavbarComponent(props) {
    const authLevel = useSelector((state) => state.authLevel);

    const dispatch = useDispatch();
    let history = useHistory();
    function logout() {
        dispatch(signout());
        history.push("/login");
    }
    var dateObj = new Date();
    var year = dateObj.getUTCFullYear();
    var month = dateObj.getUTCMonth() + 1;

    switch (authLevel) {
        default:
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">お金楽しめ</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        case 1:
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">お金楽しめ</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        家計管理
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="/expense-add">家計を追加</a>
                                        <a className="dropdown-item" href={"/expense-list/" + year + "/" + month}>家計を見る</a>
                                    </div>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#logoutModal">Logout</button>
                                </li>

                            </ul>
                        </div>
                    </nav>


                    {/* The Modal */}
                    <div className="modal" id="logoutModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Logout</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    ログアウトでよろしいですか。
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer btn-toolbar">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={logout}>Logout</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Modal*/}
                </div>
            );
        case 2:
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">お金楽しめ</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        家計管理
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="/expense-add">家計を追加</a>
                                        <a className="dropdown-item" href={"/expense-list/" + year + "/" + month}>家計を見る</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ファミリ管理
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="/family">ファミリメンバ</a>
                                        <a className="dropdown-item" href="/add-family-member">ファミリメンバ登録</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        買い物管理
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="/expense-type">費目管理</a>
                                        <a className="dropdown-item" href="/store">ストア管理</a>
                                    </div>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#logoutModal">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* The Modal */}
                    <div className="modal" id="logoutModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Logout</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    ログアウトでよろしいですか。
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer btn-toolbar">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={logout}>Logout</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Modal*/}
                </div>
            );
        case 3:
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">お金楽しめ</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/create-member">Create Member <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#logoutModal">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </nav>


                    {/* The Modal */}
                    <div className="modal" id="logoutModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Logout</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    ログアウトでよろしいですか。
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer btn-toolbar">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={logout}>Logout</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Modal*/}
                </div>
            );

    }

}
export default NavbarComponent;