import React, { Component } from 'react';
import ExpenseInfoService from '../../services/ExpenseInfoService';

class FilterRowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseTypes: [],
            stores: [],
            users: [],
            expenseTypeChoosen: 0,
            moneyRangeChoosen: 0,
            storeChoosen: 0,
            userChoosen: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.filterClick = this.filterClick.bind(this);
    }

    componentDidMount() {
        ExpenseInfoService.getFilerData().then(res => {
            this.setState({ expenseTypes: res.data.expenseTypes });
            this.setState({ stores: res.data.stores });
            this.setState({ users: res.data.userList });
        })
        this.props.handleFilter(this.state.expenseTypeChoosen
                                ,this.state.moneyRangeChoosen
                                ,this.state.storeChoosen
                                ,this.state.userChoosen);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    filterClick(event){
        event.preventDefault();
        this.props.handleFilter(this.state.expenseTypeChoosen
            ,this.state.moneyRangeChoosen
            ,this.state.storeChoosen
            ,this.state.userChoosen);
    }
    
    render() {
        return (
            <form>
                <div className="form-row border border-light">
                    <div className="col">
                        <label htmlFor="inputState">費目</label>
                        <select name="expenseTypeChoosen" className="form-control"
                            value={this.state.expenseTypeChoosen} onChange={this.handleChange}>
                            <option defaultValue value="0">指定しない</option>
                            {
                                this.state.expenseTypes.map(
                                    expenseType =>
                                        <option key={expenseType.id} value={expenseType.id}>{expenseType.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="inputState">金額レンジ</label>
                        <select name="moneyRangeChoosen" className="form-control"
                            value={this.state.moneyRangeChoosen} onChange={this.handleChange}>
                            <option defaultValue value="0">指定しない</option>
                            <option defaultValue value="1">0〜1000円</option>
                            <option defaultValue value="2">1000〜5000円</option>
                            <option defaultValue value="3">5000〜10000円</option>
                            <option defaultValue value="4">10000〜　。。。円</option>

                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="inputState">ストア</label>
                        <select name="storeChoosen" className="form-control"
                            value={this.state.storeChoosen} onChange={this.handleChange}>
                            <option defaultValue value="0">指定しない</option>
                            {
                                this.state.stores.map(
                                    store =>
                                        <option key={store.id} value={store.id}>{store.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="inputState">メンバー</label>
                        <select name="userChoosen" className="form-control"
                            value={this.state.userChoosen} onChange={this.handleChange}>
                            <option defaultValue value="0">指定しない</option>
                            {
                                this.state.users.map(
                                    user =>
                                        <option key={user.id} value={user.id}>{user.displayname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <h1></h1>
                        <button className = "btn btn-success btn-lg btn-block" onClick = {this.filterClick}>Filter</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FilterRowComponent;