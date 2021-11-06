import React, { Component } from 'react';
import ExpenseTypeService from '../../services/ExpenseTypeService';

class ExpenseTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseTypes: []
        }
        this.gotoEdit = this.gotoEdit.bind();
    }
    componentDidMount() {
        ExpenseTypeService.getExpenseTypeList().then(res => {
            this.setState({ expenseTypes: res.data });
        })
    }
    gotoEdit = (id) => {
        this.props.history.push("expensetype-edit/" + id)
    }
    render() {
        return (
            <div>
                <h2 className="text-center">費目一覧</h2>

                <div className="row">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>No.</th>
                                <th>名称</th>
                                <th>メモ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.expenseTypes.map(
                                    (type,index) =>
                                        <tr key={type.id} onClick={() => this.gotoEdit(type.id)}>
                                            <td>{index +1}</td>
                                            <td>{type.name}</td>
                                            <td>{type.memo}</td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                    <br />
                    <div className="row">
                        <div className="col-6 col-sm-3">
                            <a href="/expensetype-add" className="btn btn-info btn-lg" role="button">費目を追加</a>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default ExpenseTypeList;