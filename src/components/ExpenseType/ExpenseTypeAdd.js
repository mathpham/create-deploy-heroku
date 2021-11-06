import React, { Component } from 'react';
import ExpenseTypeService from '../../services/ExpenseTypeService';

class ExpenseTypeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseTypeName: "",
            expenseTypeMemo: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveExpenseType = this.saveExpenseType.bind(this);
    }

    saveExpenseType = (event) =>{
        event.preventDefault();
        var user = JSON.parse(localStorage.getItem("user"));
        let expensetype = {
            name: this.state.expenseTypeName,
            memo: this.state.expenseTypeMemo,
            familyid: user.familyid
        }
        ExpenseTypeService.saveExpenseType(expensetype).then(res => {
            this.props.history.push("/expense-type");
        })
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">費目追加</h2>
                <form onSubmit={this.saveExpenseType}>
                    <div className="form-group">
                        <label>名称:</label>
                        <input type="text" className="form-control"
                            placeholder="Enter Name of Expense Type"
                            value={this.state.expenseTypeName} name="expenseTypeName"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>メモ:</label>
                        <input type="text" className="form-control"
                            placeholder="Write something for memo"
                            value={this.state.expenseTypeMemo} name="expenseTypeMemo"
                            onChange={this.handleChange} />
                    </div>
                    <div className="modal-footer btn-toolbar">
                        <a href="/expense-type" className="btn btn-secondary" role="button">Cancel</a>
                        <button type="submit" className="btn btn-primary">追加</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default ExpenseTypeAdd;