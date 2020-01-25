import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './transitions/logo.css';

const Logo = () => {
  return (
    <CSSTransition in timeout={5000} classNames="Logo" appear>
      <h1>Phonebook</h1>
    </CSSTransition>
  );
};

export default Logo;
