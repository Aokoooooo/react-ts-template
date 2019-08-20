import { WrappedFormUtils } from "antd/es/form/Form";
import { Component, MutableRefObject } from "react";

// tslint:disable-next-line: interface-over-type-literal
export type FormUtils<F extends {} = {}, V = any> = {
  form: WrappedFormUtils<V> & F;
};

export type FormComponent<
  P extends {} = {},
  F extends {} = {},
  V = any
> = Component<FormUtils<F, V> & P>;

export type FormRef<
  P extends {} = {},
  F extends {} = {},
  V = any
> = MutableRefObject<FormComponent<P, F, V> | null>;

export const bindFormRef = <P extends {} = {}, F extends {} = {}, V = any>(
  component: FormComponent<P, F, V>,
  ref: FormRef<P, F, V>
) => {
  if (ref.current === null) {
    ref.current = component;
  }
};

export const resetFormFields = <P extends {}, F extends {}, V = any>(
  ref: FormRef<P, F, V>,
  names?: string[]
) => {
  if (!ref.current) {
    return;
  }
  ref.current.props.form.resetFields(names);
};

export const validateFormFields = <P extends {}, F extends {}, V = any>(
  ref: FormRef<P, F, V>,
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

export const getFormFieldsValue = <P extends {}, F extends {}, V = any>(
  ref: FormRef<P, F, V>,
  names: string[]
) => {
  if (!ref.current) {
    return;
  }
  return ref.current.props.form.getFieldsValue(names);
};

export const getFormFieldValue = <P extends {}, F extends {}, V = any>(
  ref: FormRef<P, F, V>,
  name: string
) => {
  if (!ref.current) {
    return;
  }
  return ref.current.props.form.getFieldValue(name);
};

export const setFormFieldValue = <P extends {}, F extends {}, V = any>(
  ref: FormRef<P, F, V>,
  props: object
) => {
  if (!ref.current) {
    return;
  }
  ref.current.props.form.setFields(props);
};

export const withFormRef = <P extends {}, F extends {}, V = any>(
  ref: FormRef<P, F, V>
) => {
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
