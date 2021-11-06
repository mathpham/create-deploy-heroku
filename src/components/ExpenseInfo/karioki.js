// List ExpenseInfo Class
import React, { Component, useEffect } from 'react';
import ExpenseInfoService from '../../services/ExpenseInfoService';

class ExpenseInfoListComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            expenseInfos: []
        }
    }
    componentDidMount(){
        ExpenseInfoService.getExpenseInfoList().then(res => {
            this.setState({expenseInfos: res.data});
        })
    }
    render() {
        return (
            <div>
                <h2 className="text-center">家計一覧</h2>
                <div className="row">
                    <div className="col-6 col-sm-3">
                        <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                    </div>
                </div>
                
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>費目</th>
                                <th>名称</th>
                                <th>金額</th>
                                <th>ストア</th>
                                <th>日付</th>
                                <th>画像</th>
                                <th>メモ</th>
                                <th>ユーザーの方</th>
                                <th>アクション</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.expenseInfos.map(
                                    expense =>
                                        <tr key={expense.id}>
                                            <td>{expense.id}</td>
                                            <td>{expense.expenseTypeName}</td>
                                            <td>{expense.name}</td>
                                            <td>{expense.amountOfMoney}</td>
                                            <td>{expense.storeName}</td>
                                            <td>{expense.datetime}</td>
                                            <td>{expense.image}</td>
                                            <td>{expense.memo}</td>
                                            <td>{expense.userDisplayName}</td>
                                            <td>Actions</td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ExpenseInfoListComponent;

//List ExpenseInfo function
import React, { useState,useEffect } from 'react';
import ExpenseInfoService from '../../services/ExpenseInfoService';

function ExpenseInfoListComponent(props) {
    const [expenseInfos,setExpenseList] = useState([]);
    useEffect(()=>{
        ExpenseInfoService.getExpenseInfoList().then((res)=>{
            setExpenseList(res.data);
    })
    },[])
    console.log("aaa");
    return (
        <div>
            <div>
                <h2 className="text-center">家計一覧</h2>
                <div className="row">
                    <div className="col-6 col-sm-3">
                        <button className="btn btn-primary"> Add Employee</button>
                    </div>
                </div>
                
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>費目</th>
                                <th>名称</th>
                                <th>金額</th>
                                <th>ストア</th>
                                <th>日付</th>
                                <th>画像</th>
                                <th>メモ</th>
                                <th>ユーザーの方</th>
                                <th>アクション</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenseInfos.map(
                                    expense =>
                                        <tr key={expense.id}>
                                            <td>{expense.id}</td>
                                            <td>{expense.expenseTypeName}</td>
                                            <td>{expense.name}</td>
                                            <td>{expense.amountOfMoney}</td>
                                            <td>{expense.storeName}</td>
                                            <td>{expense.datetime}</td>
                                            <td>{expense.image}</td>
                                            <td>{expense.memo}</td>
                                            <td>{expense.userDisplayName}</td>
                                            <td>Actions</td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpenseInfoListComponent;

// FilterRow function

import React, { useEffect, useState } from 'react';
import ExpenseInfoService from '../../services/ExpenseInfoService';

function FilterRowComponent(props) {
    const [expenseTypes, setExpenseTypes] = useState([]);
    useEffect(() => {
        ExpenseInfoService.getFilerData().then(res => {
            setExpenseTypes(res.data.expenseTypes);
        });
    }, []);

    return (
        <form>
            <div className="form-row border border-light">
                <div className="form-group col-md-4">
                    <label htmlFor="inputState">費目</label>
                    <select name="expenseType" className="form-control">
                        <option defaultValue value = "0">Select All</option>
                        {
                            expenseTypes.map(
                                expenseType => 
                                <option key = {expenseType.id} value = {expenseType.id}>{expenseType.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                </div>
            </div>
        </form>
    );
}

export default FilterRowComponent;