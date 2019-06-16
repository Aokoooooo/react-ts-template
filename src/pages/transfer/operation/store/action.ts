import { ISearchForm } from "../components/HeaderSearchForm";
export const CHANGE_SEARCH_FORM = "CHANGE_SEARCH_FORM";

export interface IChangeSearchFormAction {
  type: typeof CHANGE_SEARCH_FORM;
  payload: ISearchForm;
}

export type TransferOperationActionType = IChangeSearchFormAction;

export const changeSearchForm = (
  payload: ISearchForm
): IChangeSearchFormAction => {
  return {
    type: CHANGE_SEARCH_FORM,
    payload
  };
};
