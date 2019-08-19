import { WrappedFormInternalProps } from "antd/es/form/Form";
import { Component, MutableRefObject } from "react";

export type FormComponent<P extends {} = {}> = Component<
  WrappedFormInternalProps & P
>;
export type FormRef<P extends {}> = MutableRefObject<FormComponent<P> | null>;

export const bindFormRef = <P extends {} = {}>(
  component: FormComponent<P>,
  ref: FormRef<P>
) => {
  if (ref.current === null) {
    ref.current = component;
  }
};

export const resetFormFields = <P extends {}>(
  ref: FormRef<P>,
  names?: string[]
) => {
  if (!ref.current) {
    return;
  }
  ref.current.props.form.resetFields(names);
};

export const validateFormFields = <P extends {}>(
  ref: FormRef<P>,
  onSuccess?: () => void,
  onFail?: () => void,
  names?: string[]
) => {
  if (!ref.current) {
    return;
  }
  const callback = (e: any) => {
    if (e) {
      if (typeof onFail === "function") {
        return onFail();
      }
      return;
    }
    if (typeof onSuccess === "function") {
      return onSuccess();
    }
  };

  if (names) {
    return ref.current.props.form.validateFieldsAndScroll(names, e =>
      callback(e)
    );
  } else {
    return ref.current.props.form.validateFieldsAndScroll(e => callback(e));
  }
};

export const getFormFieldsValue = <P extends {}>(
  ref: FormRef<P>,
  names: string[]
) => {
  if (!ref.current) {
    return;
  }
  return ref.current.props.form.getFieldsValue(names);
};

export const getFormFieldValue = <P extends {}>(
  ref: FormRef<P>,
  name: string
) => {
  if (!ref.current) {
    return;
  }
  return ref.current.props.form.getFieldValue(name);
};

export const setFormFieldValue = <P extends {}>(
  ref: FormRef<P>,
  props: object
) => {
  if (!ref.current) {
    return;
  }
  ref.current.props.form.setFields(props);
};

export const withFormRef = <P extends {}>(ref: FormRef<P>) => {
  return {
    resetFormFields: (names?: string[]) => resetFormFields(ref, names),
    validateFormFields: (
      onSuccess?: () => void,
      onFail?: () => void,
      names?: string[]
    ) => validateFormFields(ref, onSuccess, onFail, names),
    getFormFieldsValue: (names: string[]) => getFormFieldsValue(ref, names),
    getFormFieldValue: (name: string) => getFormFieldValue(ref, name),
    setFormFieldValue: (props: object) => setFormFieldValue(ref, props)
  };
};
