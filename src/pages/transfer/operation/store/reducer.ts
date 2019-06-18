import { injectReducer } from "../../../../config/store";
import { initSearchForm, ISearchForm } from "../components/HeaderSearchForm";
import { CHANGE_SEARCH_FORM, TransferOperationActionType } from "./action";

const initState = {
  searchForm: { ...initSearchForm }
};

export interface IOperationState {
  searchForm: ISearchForm;
}

const operationReducer = (
  state = initState,
  action: TransferOperationActionType
): IOperationState => {
  switch (action.type) {
    case CHANGE_SEARCH_FORM:
      return { ...state, searchForm: { ...action.payload } };
    default:
      return state;
  }
};

injectReducer("transferOperation", operationReducer);
