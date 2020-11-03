import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logoImg.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarger" />

      <form>
        <h1>Login</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Login</Button>

        <a href="forgot">Forgot my password</a>
      </form>

      <a href="forgot">
        <FiLogIn />
        Create Account
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
