import React, { Component } from 'react';
import ExpenseInfoService from '../../services/ExpenseInfoService';

class AddNewExpenseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseTypes: [],
            stores: [],
            users: [],
            expenseTypeChoosen: 0,
            storeChoosen: 0,
            userChoosen: 0,
            dateChoosen: new Date(),
            amountOfMoney: 0,
            expenseName: '',
            expenseMemo: '',
            picture: 'null',
            year: new Date().getUTCFullYear(),
            month: new Date().getUTCMonth() +1

        }
        this.handleChange = this.handleChange.bind(this);
        this.saveExpenseInfo = this.saveExpenseInfo.bind(this);
    }
    componentDidMount() {
        ExpenseInfoService.getFilerData().then(res => {
            this.setState({ expenseTypes: res.data.expenseTypes });
            this.setState({ stores: res.data.stores });
            this.setState({ users: res.data.userList });
            this.state.expenseTypes.map((expenseType, index) => {
                if (index === 0) {
                    this.setState({ expenseTypeChoosen: expenseType.id });
                }
            })
            this.state.stores.map((store, index) => {
                if (index === 0) {
                    this.setState({ storeChoosen: store.id });
                }
            })
            let user = JSON.parse(localStorage.getItem("user"));
            this.setState({ userChoosen: user.id });
        })
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveExpenseInfo = (event) => {
        event.preventDefault();
        var user = JSON.parse(localStorage.getItem("user"));
        let expenseInfo = {
            expenseTypeId: this.state.expenseTypeChoosen,
            familyId: user.familyid,
            datatime: this.state.dateChoosen,
            amountOfMoney: this.state.amountOfMoney,
            storeId: this.state.storeChoosen,
            name: this.state.expenseName,
            image: this.state.picture,
            memo: this.state.expenseMemo,
            userId: this.state.userChoosen
        }
        ExpenseInfoService.saveExpenseInfo(expenseInfo).then(res => {
             
            this.props.history.push('/expense-list/'+this.state.year +'/' +this.state.month);
        })
    }
    render() {
        return (

            <div>
                <h2 className="text-center">費用追加</h2>
                <form onSubmit={this.saveExpenseInfo}>
                    <div className="form-group">
                        <label >費目:</label>
                        <select name="expenseTypeChoosen" className="form-control"
                            value={this.state.expenseTypeChoosen} onChange={this.handleChange}>
                            {
                                this.state.expenseTypes.map(
                                    expenseType =>
                                        <option key={expenseType.id} value={expenseType.id}>{expenseType.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>名称:</label>
                        <input type="text" className="form-control"
                            placeholder="Enter Name of Expense"
                            value={this.state.expenseName} name="expenseName"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>金額:</label>
                        <input type="number" className="form-control"
                            placeholder="Enter Amount of Money"
                            value={this.state.amountOfMoney} name="amountOfMoney"
                            onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label >ストア:</label>
                        <select name="storeChoosen" className="form-control"
                            value={this.state.storeChoosen} onChange={this.handleChange}>
                            {
                                this.state.stores.map(
                                    store =>
                                        <option key={store.id} value={store.id}>{store.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>メンバー</label>
                        <select name="userChoosen" className="form-control"
                            value={this.state.userChoosen} onChange={this.handleChange}>
                            {
                                this.state.users.map(
                                    user =>
                                        <option key={user.id} value={user.id}>{user.displayname}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>日付</label>
                        <br />
                        <input type="date" name="dateChoosen" value={this.state.dateChoosen} onChange={this.handleChange} />
                    </div>
                    <div className="form-group" style={{display: 'none'}}>
                        <label>Image:</label>
                        <input type="text" className="form-control"
                            placeholder="Take a picture"
                            value={this.state.picture} name="picture"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>メモ:</label>
                        <input type="text" className="form-control"
                            placeholder="Take a note"
                            value={this.state.expenseMemo} name="expenseMemo"
                            onChange={this.handleChange} />
                    </div>
                    <div className="modal-footer btn-toolbar">
                        <a href={"/expense-list/" +this.state.year +"/" + this.state.month} className="btn btn-secondary" role="button">Cancel</a>
                        <button type="submit" className="btn btn-primary">追加</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddNewExpenseInfo;