import React, { useEffect, useRef } from "react";
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

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { registerField, defaultValue = '', error, fieldName } = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

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
      defaultValue={defaultValue}/>
    </Container>
  );
};

export default Input;
