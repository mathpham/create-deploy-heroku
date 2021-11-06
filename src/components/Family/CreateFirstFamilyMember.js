import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from 'react-validation/build/input';
import validator from 'validator';
import userService from '../../services/user.service';
const required = (value) => {
    if (!value) {
        return (
            <p className="text-danger">This field is required!</p>
        );
    }
};
const email = (value) => {
    if (!validator.isEmail(value)) {
      return <p className="text-danger">{value} is not a valid email!</p>
    }
  };

  const password = (value,props, components) => {
    if (value !== components['password'][0].value) { 
      return <p className="text-danger">Passwords are not equal.</p>
    }
  }; 
class CreateFirstFamilyMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            email: '',
            familyid: '',
            displayname: '',
            familyid: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveMember = this.saveMember.bind(this);
        
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveMember = (e) =>{
        e.preventDefault();
        this.form.validateAll();
        let roles = ['householder','user'];
        
        let signupRequest = {
            username: this.state.username,
            email: this.state.email,
            role: roles,
            password: this.state.password,
            familyid: this.state.familyid,
            displayname: this.state.displayname
        }
        userService.saveFamilyMember(signupRequest).then(res=>{
            this.props.history.push("/");
        })
        
    }

    render() {
        
        return (
            <div>
                <h2 className="text-center">メンバーを追加</h2>
                <Form onSubmit={this.saveMember}
                ref={c => {
                    this.form = c;
                  }}>
                    <div className="form-group">
                        <label>Family Id:</label>
                        <Input type="number" className="form-control"
                            placeholder="Enter Family Id"
                            value={this.state.familyid} name="familyid"
                            onChange={this.handleChange}
                            validations = {[required]} />
                    </div>
                    <div className="form-group">
                        <label>Username:</label>
                        <Input type="text" className="form-control"
                            placeholder="Enter username"
                            value={this.state.username} name="username"
                            onChange={this.handleChange}
                            validations = {[required]} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <Input type="text" className="form-control"
                            placeholder="Enter email"
                            value={this.state.email} name="email"
                            onChange={this.handleChange}
                            validations = {[required,email]} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <Input type="password" className="form-control"
                            placeholder="Enter password"
                            value={this.state.password} name="password"
                            onChange={this.handleChange}
                            validations = {[required]} />
                    </div>
                    <div className="form-group">
                        <label>Re-password:</label>
                        <Input type="password" className="form-control"
                            placeholder="Enter password again"
                            value={this.state.repassword} name="repassword"
                            onChange={this.handleChange}
                            validations = {[required,password]} />
                    </div>
                    
                    <div className="form-group">
                        <label>Display name:</label>
                        <Input type="text" className="form-control"
                            placeholder="Enter display name"
                            value={this.state.displayname} name="displayname"
                            onChange={this.handleChange}
                            validations = {[required]} />
                    </div>
                    <div className="modal-footer btn-toolbar">
                        <a href="/" className="btn btn-secondary" role="button">Cancel</a>
                        <button type="submit" className="btn btn-primary">追加</button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CreateFirstFamilyMember;