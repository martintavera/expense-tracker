import {combineReducers} from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import categoryReducer from './categoryReducer';
import incomeReducer from './incomeReducer';
import yearReducer from './yearReducer';
import monthReducer from './monthReducer';
import budgetReducer from './budgetReducer';
import expenseReducer from './expenseReducer';
import incomeYearMonthReducer from './incomeYearMonthReducer';
import budgetByCategoryReducer from './budgetByCategoryReducer';
import assetReducer from './assetReducer';
import liabilityReducer from './liabilityReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  category: categoryReducer,
  income: incomeReducer,
  year: yearReducer,
  month: monthReducer,
  budget: budgetReducer,
  expense: expenseReducer,
  incomeYearMonth: incomeYearMonthReducer,
  budgetByCategory: budgetByCategoryReducer,
  asset: assetReducer,
  liability: liabilityReducer,
  report: reportReducer
})