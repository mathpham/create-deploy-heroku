import './App.css';

import { Switch, Route,Redirect } from "react-router-dom";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/login.component';
import Profile from './components/profile.component';
import NavbarComponent from './components/NavbarComponent';
import TestCode from './components/TestCode';
import { useSelector, useDispatch } from 'react-redux';
import LogoutComponent from './components/LogoutComponent';

import { checkauthlevel } from './actions/isLogin';
import ExpenseInfoListComponent from './components/ExpenseInfo/ExpenseInfoListComponent';
import AddNewExpenseInfo from './components/ExpenseInfo/AddNewExpenseInfo';
import EditExpenseInfoComponent from './components/ExpenseInfo/EditExpenseInfoComponent';
import ExpenseTypeList from './components/ExpenseType/ExpenseTypeList';
import ExpenseTypeEdit from './components/ExpenseType/ExpenseTypeEdit';
import ExpenseTypeAdd from './components/ExpenseType/ExpenseTypeAdd';
import StoreList from './components/Store/StoreList';
import StoreEdit from './components/Store/StoreEdit';
import StoreAdd from './components/Store/StoreAdd';
import FamilyMembers from './components/Family/FamilyMembers';
import AddMember from './components/Family/AddMember';
import CreateFirstFamilyMember from './components/Family/CreateFirstFamilyMember';
import Home from './components/Home';
function App() {
  const dispatch = useDispatch();
  dispatch(checkauthlevel());
  var authLevel = useSelector((state) => state.authLevel);

  const UserRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (authLevel >= 1 && authLevel < 3) {
          return (
            <div>
              <Component {...props} />
            </div>

          );
        }
        else {
          return (
            <Redirect to={{ pathname: "/" }} />
          );
        }
      }
      }
    />
  );

  const HouseHolderRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        (authLevel === 2) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authLevel >= 3 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
  return (
    <div>
      <NavbarComponent />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/testcode" component={TestCode} />
          <Route exact path="/logout" component={LogoutComponent} />
          <UserRoute path="/expense-list/:year/:month" component={ExpenseInfoListComponent}></UserRoute>
          <UserRoute path="/expense-add" component={AddNewExpenseInfo}></UserRoute>
          <UserRoute path="/expense-edit/:id" component={EditExpenseInfoComponent}></UserRoute>
          <HouseHolderRoute path="/expense-type/" component={ExpenseTypeList}></HouseHolderRoute>
          <HouseHolderRoute path="/expensetype-edit/:id" component={ExpenseTypeEdit}></HouseHolderRoute>
          <HouseHolderRoute path="/expensetype-add" component={ExpenseTypeAdd}></HouseHolderRoute>
          <HouseHolderRoute path="/store" component={StoreList}></HouseHolderRoute>
          <HouseHolderRoute path="/store-edit/:id" component={StoreEdit}></HouseHolderRoute>
          <HouseHolderRoute path="/store-add" component={StoreAdd}></HouseHolderRoute>
          <HouseHolderRoute path="/family" component={FamilyMembers}></HouseHolderRoute>
          <HouseHolderRoute path="/add-family-member" component={AddMember}></HouseHolderRoute>
          <AdminRoute path="/create-member" component={CreateFirstFamilyMember}></AdminRoute>

        </Switch>
      </div>
    </div>
  );
}
export default App;
