import React, { Component } from 'react';
import PhonebookForm from './PhonebookForm';
import ContactList from './ContactList';
import ContactFilter from './ContactFilter';
import Section from './Section';
import Notification from './Notification';
import { v4 as uuidv4 } from 'uuid';
// import PropTypes from 'prop-types'; is not necessary here(look at prev hw2)

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // addContact = (newName, newNumber) => {
  //   console.log(newName, newNumber);
  //   const newContact = {
  //     id: uuidv4(),
  //     name: newName,
  //     number: newNumber,
  //   };

  //   if (this.state.contacts.some(contact => contact.name === newName)) {
  //     alert(`${newName} is already in contacts.`);
  //     return;
  //   }
  //   this.setState(prevState => {
  //     return {
  //       contacts: [...prevState.contacts, newContact],
  //     };
  //   });
  // };

  addContact = newContact => {
    const { name, number } = newContact;
    // console.log(newContact);
    // Can use one param, because was written this.props.onAddContact(this.state) - all state, included name/number
    const { contacts } = this.state;
    const theContact = {
      id: uuidv4(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, theContact],
      };
    });
  };

  // Checking...
  // addContact = (newContact, newNumber) => {
  //   console.log(newContact);
  //   console.log(newNumber);
  // };

  deleteContact = contactId => {
    this.setState(prevState => {
      const { contacts } = prevState;

      return {
        contacts: contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getContactsByFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  // the same with destr
  // getContactsByFilter = () => {
  //   const { contacts, filter } = this.state;
  //   return contacts.filter(({ name }) =>
  //     name.toLowerCase().included(filter.toLowerCase()),
  //   );
  // };

  render() {
    const { contacts, filter } = this.state;
    const contactsWithFilter = this.getContactsByFilter();

    return (
      <>
        <Section title="Phonebook">
          <PhonebookForm onAddContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length > 1 && (
            <ContactFilter value={filter} onChangeFilter={this.changeFilter} />
          )}
          {contacts.length < 1 ? (
            <Notification msg="The contact wasn't added" />
          ) : (
            <ContactList
              contacts={contactsWithFilter}
              onDeleteContact={this.deleteContact}
            />
          )}
        </Section>
      </>
    );
  }
}
