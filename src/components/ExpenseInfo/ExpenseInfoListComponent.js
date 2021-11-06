import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import ExpenseInfoService from '../../services/ExpenseInfoService';
import FilterRowComponent from './FilterRowComponent';
function ExpenseInfoListComponent(props) {
    const [expenseInfos, setExpenseList] = useState([]);
    const [delExpense, setDelExpense] = useState({
        id: 0,
        name: ''
    });
    const[filterData, setFilterData] = useState({
        expenseTypeId: 0,
        moneyRange: 0,
        storeId: 0,
        memberId:0
    })

    const { year, month } = useParams();
    useEffect(() => {
        ExpenseInfoService.getExpenseInfoList(year, month).then((res) => {
            setExpenseList(res.data);
        })
    }, [year,month,setDelExpense]);
   
    useEffect(()=>{
        if(filterData.expenseTypeId !== 0 || filterData.moneyRange !== 0 || filterData.storeId !== 0 || filterData.memberId !== 0 ){
            let sendData = {
                expenseTypeId: filterData.expenseTypeId,
                moneyRange: filterData.moneyRange,
                storeId: filterData.storeId,
                memberId: filterData.memberId,
                accessToken: JSON.parse(localStorage.getItem("user")).accessToken,
                year: year,
                month: month
            }
            ExpenseInfoService.getExpenseInfoForFilter(sendData).then(res=>{
                setExpenseList(res.data);
            })
        }
    },[filterData])
   

    var TotalMoney = 0;
    expenseInfos.map(expense => {
        TotalMoney = TotalMoney + expense.amountOfMoney;
    })

    function delExpenseInfo() {
        ExpenseInfoService.delExpenseInfo(delExpense.id).then(res => {
            ExpenseInfoService.getExpenseInfoList().then((res) => {
                setExpenseList(res.data);
            });
        })
    }

    function handleFilter(expenseTypeId,moneyRange,storeId,memberId){
        setFilterData({...filterData, expenseTypeId:expenseTypeId, moneyRange:moneyRange,storeId:storeId, memberId:memberId});
    }

    var history = useHistory();
    function prevMonth(){
        if(month <= 1){
            let preyear = year - 1;
            let prevmonth = 12;
            history.push("/expense-list/" +preyear +"/"+prevmonth);
        }else{
            let prevyear = year;
            let prevmonth = month - 1;
            history.push("/expense-list/" + prevyear +"/"+prevmonth);
        }
    }
    function nextMonth(){
        if(month >= 12){
            let preyear = Number(year) + 1;
            let prevmonth = 1;
            history.push("/expense-list/" +preyear +"/"+prevmonth);
        }else{
            let prevyear = Number(year);
            let prevmonth = Number(month) + 1;
            history.push("/expense-list/" + prevyear +"/"+prevmonth);
        }
    }

    
    return (
        <div>
            <div className="d-flex justify-content-between bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                    <button type="button" className="btn btn-primary btn-sm" onClick={prevMonth}>前月へ</button>
                </div>
                <div className="p-2 bd-highlight"><h2 className="text-center">家計一覧 {year}年{month}月</h2></div>
                <div className="p-2 bd-highlight">
                    <button type="button" className="btn btn-primary btn-sm" onClick={nextMonth}>翌月へ</button>
                </div>
            </div>
            

            <FilterRowComponent handleFilter = {handleFilter} />

            <div className="row">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>費目</th>
                            <th>名称</th>
                            <th>金額</th>
                            <th>ストア</th>
                            <th>日付</th>
                            <th style={{display: 'none'}}>画像</th>
                            <th>メモ</th>
                            <th>ユーザーの方</th>
                            <th>アクション</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenseInfos.map(
                                (expense, index) =>
                                    <tr key={expense.id}>
                                        <td>{index + 1}</td>
                                        <td>{expense.expenseTypeName}</td>
                                        <td>{expense.name}</td>
                                        <td>{expense.amountOfMoney}</td>
                                        <td>{expense.storeName}</td>
                                        <td>{expense.datetime}</td>
                                        <td style={{display: 'none'}}>{expense.image}</td>
                                        <td>{expense.memo}</td>
                                        <td>{expense.userDisplayName}</td>
                                        <td>
                                            <div className="btn-group">
                                                <a href={"/expense-edit/" + expense.id} className="btn btn-warning btn-sm" role="button">Edit</a>

                                                <button type="button" className="btn btn-danger btn-sm" data-toggle="modal" data-target="#delModal" onClick={() => setDelExpense({...delExpense,id:expense.id,name:expense.name})}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                            )

                        }
                        <tr>
                            <td colSpan="2"><b>Total Money:</b></td>
                            <td colSpan="2"><b className="text-danger">{TotalMoney}</b></td>
                        </tr>
                    </tbody>

                </table>
                <br />
                <div className="row">
                    <div className="col-6 col-sm-3">
                        <a href="/expense-add" className="btn btn-info btn-lg" role="button">家計を追加</a>
                    </div>
                </div>
            </div>

            {/* The Modal */}
            <div className="modal" id="delModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">費用削除</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            費用名： {delExpense.name}を削除しませんか。
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer btn-toolbar">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={delExpenseInfo}>削除</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ExpenseInfoListComponent;