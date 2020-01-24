import React, { Component } from 'react';
import uuid from 'uuid';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459125156' },
      { id: 'id-2', name: 'Hermione Kline', number: '445118912' },
      { id: 'id-3', name: 'Eden Clements', number: '645115579' },
      { id: 'id-4', name: 'Annie Copeland', number: '222275126' },
    ],
    filter: '',
    isAlreadyExist: null,
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
      this.setState({ isAlreadyExist: true });
    }
  };

  deleteItem = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, isAlreadyExist } = this.state;
    const filtratedContacts = this.filterContacts(contacts, filter);
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onAddItem={this.addItem} />
        <h2>Contacts</h2>
        <Filter onSetFilter={this.setFilter} />
        {isAlreadyExist && <Notification />}
        <ContactList items={filtratedContacts} onDelete={this.deleteItem} />
      </div>
    );
  }
}

export default App;
