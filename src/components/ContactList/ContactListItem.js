import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const { contactListItem, contactBtn } = styles;

const ContactListItem = ({ id, name, number, onDeleteContact }) => (
  <li key={id} className={contactListItem}>
    <p>
      {name}: {number}
    </p>
    <button
      type="button"
      onClick={() => onDeleteContact(id)}
      className={contactBtn}
    >
      Delete
    </button>
  </li>
);

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
