import React, { Component } from 'react';
import ExpenseInfoService from '../../services/ExpenseInfoService';

class EditExpenseInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            editExpense: [],
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
            picture: '',
            year: new Date().getUTCFullYear(),
            month: new Date().getUTCMonth() +1
        }
        this.handleChange = this.handleChange.bind(this);
        this.editExpenseInfo = this.editExpenseInfo.bind(this);
    }
    componentDidMount() {
        ExpenseInfoService.getFilerData().then(res => {
            this.setState({ expenseTypes: res.data.expenseTypes });
            this.setState({ stores: res.data.stores });
            this.setState({ users: res.data.userList });

        })

        ExpenseInfoService.getExpenseInfoByid(this.state.id).then(res => {
            this.setState({ expenseTypeChoosen: res.data.expenseType.id });
            this.setState({ storeChoosen: res.data.store.id });
            this.setState({ userChoosen: res.data.user.id });
            let datetime = new Date(res.data.datetime);
            datetime.setDate(datetime.getDate() + 1);
            let date = datetime.toISOString().substr(0, 10);
            this.setState({ dateChoosen: date });
            this.setState({ amountOfMoney: res.data.amountOfMoney });
            this.setState({ expenseName: res.data.name });
            this.setState({ expenseMemo: res.data.memo });
            this.setState({ picture: res.data.image });

        })
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    editExpenseInfo = (event) => {
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
        ExpenseInfoService.editExpenseInfo(this.state.id, expenseInfo).then(res => {
            
            this.props.history.push('/expense-list/'+this.state.year+'/'+this.state.month);
        })
    }
    render() {
        return (
            <div>
                <h2 className="text-center">費用修正</h2>
                <form onSubmit={this.editExpenseInfo}>
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
                        <button type="submit" className="btn btn-primary">修正</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default EditExpenseInfoComponent;