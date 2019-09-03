import { createAction, createReducer } from "aqua-actions";
import { initSearchForm, ISearchForm } from "../components/HeaderSearchForm";

export interface IOperationState {
  searchForm: ISearchForm;
}

const initState: IOperationState = {
  searchForm: { ...initSearchForm }
};

export const changeSearchForm = createAction<ISearchForm>("CHANGE_SEARCH_FORM");

export const operationReducer = createReducer(initState)
  .handleAction(changeSearchForm, (state, action) => {
    return { ...state, searchForm: { ...state.searchForm, ...action.payload } };
  })
  .build();
