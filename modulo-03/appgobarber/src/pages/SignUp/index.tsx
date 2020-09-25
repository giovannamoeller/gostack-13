import React from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import logo from "../../assets/logo.png";

import Input from "../../components/Input";
import Button from "../../components/Button";

import Icon from "react-native-vector-icons/Feather";

import {
  Container,
  Title,
  BackToLogin,
  BackToLoginText
} from "./styles";
import { useNavigation } from "@react-navigation/native";

const SignUp: React.FC = () => {
const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input
              name="email"
              icon="user"
              placeholder="Nome"
              placeholderTextColor="#666360"
            />
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              placeholderTextColor="#666360"
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              placeholderTextColor="#666360"
            />

            <Button onPress={() => console.log("Oi")}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#F4EDE8" />
        <BackToLoginText>Voltar para o login</BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default SignUp;
