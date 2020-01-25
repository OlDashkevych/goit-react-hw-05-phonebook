import React, { Component } from 'react';
import uuid from 'uuid';
import { CSSTransition } from 'react-transition-group';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
import styles from './App.module.css';
import slideTransition from '../Notification/transitions/slide.module.css';
import Logo from '../Logo/Logo';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    contactAlreadyExist: false,
  };

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  setFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  addItem = item => {
    const isNotExist = this.state.contacts.every(
      contact =>
        contact.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase(),
    );
    if (isNotExist) {
      const itemToAdd = { ...item, id: uuid() };
      this.setState(state => ({
        contacts: [...state.contacts, itemToAdd],
      }));
    } else {
      this.setState({ contactAlreadyExist: true });
    }
  };

  deleteItem = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, contactAlreadyExist } = this.state;
    const filtratedContacts = this.filterContacts(contacts, filter);
    return (
      <div className={styles.container}>
        <Logo />
        <CSSTransition
          in={contactAlreadyExist}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>

        <ContactForm onAddItem={this.addItem} />
        <h2>Contacts</h2>
        <Filter onSetFilter={this.setFilter} />
        <ContactList items={filtratedContacts} onDelete={this.deleteItem} />
      </div>
    );
  }
}

export default App;
