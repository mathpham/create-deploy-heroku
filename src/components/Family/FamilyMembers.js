import React, { Component } from 'react';
import userService from '../../services/user.service';

class FamilyMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
        
    }
    componentDidMount(){
        userService.getFamilyMemberList().then(res=>{
            this.setState({members : res.data});
        })
    }
    render() {
        return (
            <div>
                <h2 className="text-center">家族メンバー</h2>

                <div className="row">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id.</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Display Name</th>
                                <th>Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.members.map(
                                    (member,index) =>
                                        <tr key={member.id}>
                                            <td>{index +1}</td>
                                            <td>{member.username}</td>
                                            <td>{member.email}</td>
                                            <td>{member.displayname}</td>
                                            <td>{member.roles.map(
                                                role => <i key = {role.id}>{role.name},</i>
                                            )}</td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                    <br />
                    <div className="row">
                        <div className="col-6 col-sm-3">
                            <a href="/add-family-member" className="btn btn-info btn-lg" role="button">メンバーを追加</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FamilyMembers;