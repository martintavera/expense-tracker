import * as actions from './types';

export const setContentLoading = (action) => {
  switch(action){
    case "user":
      return {
        type: actions.USER_LOADING
      }
    case "category":
      return {
        type: actions.CATEGORY_LOADING
      }
    case "year":
      return {
        type: actions.YEAR_LOADING
      }
    case "income":
      return {
        type: actions.INCOME_LOADING
      }
    case "month":
      return {
        type: actions.MONTH_LOADING
      }
    case "budget":
      return {
        type: actions.BUDGET_LOADING
      }
    case "expense":
      return {
        type: actions.EXPENSE_LOADING
      }
    case "year_month":
      return {
        type: actions.YEAR_MONTH_LOADING
      }
    case "budget_by_category":
      return {
        type: actions.BUDGET_BY_CATEGORY_LOADING
      }
    case "asset":
      return {
        type: actions.ASSET_LOADING
      }
    case "liability":
      return {
        type: actions.LIABILITY_LOADING
      }
    case "report":
      return {
        type: actions.REPORT_LOADING
      }
    default:
      return {
        type: actions.CONTENT_LOADING
      }
  }
}