import React, { Component } from 'react';
import StoreService from '../../services/StoreService';

class StoreAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: '',
            storeInfo: '',
            storeMemo: '',
            storeUsingTime: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveStore = this.saveStore.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    saveStore = (event) =>{
        event.preventDefault();
        var user = JSON.parse(localStorage.getItem("user"));
        let store = {
            familyid: user.familyid,
            storeInfo: this.state.storeInfo,
            memo: this.state.storeMemo,
            name: this.state.storeName,
            usingTimes: this.state.storeUsingTime
        }
        StoreService.saveStore(store).then(res => {
            this.props.history.push("/store");
        })
    }
    
    render() {
        return (
            <div>
                <h2 className="text-center">ストア追加</h2>
                <form onSubmit={this.saveStore}>
                    <div className="form-group">
                        <label>ストア名:</label>
                        <input type="text" className="form-control"
                            placeholder="Enter Name of Store"
                            value={this.state.storeName} name="storeName"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>ストア情報:</label>
                        <input type="text" className="form-control"
                            placeholder="Enter Address or Phone number v.v"
                            value={this.state.storeInfo} name="storeInfo"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>ストアメモ:</label>
                        <input type="text" className="form-control"
                            placeholder="Write memo"
                            value={this.state.storeMemo} name="storeMemo"
                            onChange={this.handleChange} />
                    </div>
                    <div className="modal-footer btn-toolbar">
                        <a href="/store" className="btn btn-secondary" role="button">Cancel</a>
                        <button type="submit" className="btn btn-primary">追加</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default StoreAdd;