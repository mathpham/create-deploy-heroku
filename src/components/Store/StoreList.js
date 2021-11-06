import React, { Component } from 'react';
import StoreService from '../../services/StoreService';

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: []
        }
        this.gotoEdit = this.gotoEdit.bind();
    }
    componentDidMount() {
        StoreService.getStoreList().then(res => {
            this.setState({ stores: res.data });
        })
    }
    gotoEdit = (id) => {
        this.props.history.push("store-edit/" + id)
    }
    render() {
        return (
            <div>
                <h2 className="text-center">ストア一覧</h2>

                <div className="row">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>No.</th>
                                <th>名称</th>
                                <th>ストア情報</th>
                                <th>メモ</th>
                                <th>使用回数</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stores.map(
                                    (store,index) =>
                                        <tr key={store.id} onClick={() => this.gotoEdit(store.id)}>
                                            <td>{index +1}</td>
                                            <td>{store.name}</td>
                                            <td>{store.storeInfo}</td>
                                            <td>{store.memo}</td>
                                            <td>{store.usingTimes}</td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                    <br />
                    <div className="row">
                        <div className="col-6 col-sm-3">
                            <a href="/store-add" className="btn btn-info btn-lg" role="button">ストアを追加</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StoreList;