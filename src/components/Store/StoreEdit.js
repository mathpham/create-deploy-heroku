import React, { Component } from 'react';
import StoreService from '../../services/StoreService';

class StoreEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            storeName: '',
            storeInfo: '',
            storeMemo: '',
            storeUsingTime: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.editStore = this.editStore.bind(this);
    }

    componentDidMount(){
        StoreService.getStoreByid(this.state.id).then(res =>{
            console.log(res.data);
            this.setState({storeName: res.data.name});
            this.setState({storeInfo:res.data.storeInfo});
            this.setState({storeMemo:res.data.memo});
            this.setState({storeUsingTime:res.data.usingTimes});
        })
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    editStore = (event) =>{
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem("user"));
        let store = {
            familyid: user.familyid,
            storeInfo: this.state.storeInfo,
            memo: this.state.storeMemo,
            name: this.state.storeName,
            usingTimes: this.state.storeUsingTime
        }
        StoreService.editStore(this.state.id,store).then(res=>{
            this.props.history.push("/store");
        })

    }
    render() {
        return (
            <div>
                <h2 className="text-center">費目追加</h2>
                <form onSubmit={this.editStore}>
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
                    <div className="form-group">
                        <label>使用回数:</label>
                        <input type="number" className="form-control"
                            placeholder="Enter number of using time"
                            value={this.state.storeUsingTime} name="storeUsingTime"
                            onChange={this.handleChange} />
                    </div>
                    <div className="modal-footer btn-toolbar">
                        <a href="/store" className="btn btn-secondary" role="button">Cancel</a>
                        <button type="submit" className="btn btn-primary">保存</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default StoreEdit;