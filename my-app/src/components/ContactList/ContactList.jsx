import React from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import styles from './ContactList.module.css';

const ContactList = ({ items, onDelete }) => {
  return items.length ? (
    <ul className={styles.list}>
      {items.map(({ name, id, number }) => {
        return (
          <li key={id} className={styles.item}>
            <span>
              {name} {new AsYouType('US').input(number)}
            </span>
            <button
              className={styles.button}
              type="button"
              onClick={() => onDelete(id)}
            >
              &#10006;
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;
};
ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ContactList;
