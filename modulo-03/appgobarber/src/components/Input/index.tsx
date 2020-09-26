import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from "react";
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

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur= useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);

  }, []);


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
    <Container isFocused={isFocused}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#FF9000' : '#666360'} />
      <TextInput {...rest} keyboardAppearance="dark"
      onChangeText={value => {
        inputValueRef.current.value = value;
      }} 
      ref={inputElementRef}
      defaultValue={defaultValue}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default forwardRef(Input);
