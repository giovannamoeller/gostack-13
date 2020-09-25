import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { TextInputProps } from "react-native";
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus():void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const { registerField, defaultValue = '', error, fieldName } = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});
  const inputElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360"/>
      <TextInput {...rest} keyboardAppearance="dark"
      onChangeText={value => {
        inputValueRef.current.value = value;
      }} 
      ref={inputElementRef}
      defaultValue={defaultValue}
      />
    </Container>
  );
};

export default forwardRef(Input);
