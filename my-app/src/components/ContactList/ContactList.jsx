import React from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './ContactList.module.css';
import popTransition from './transitions/pop.module.css';

const ContactList = ({ items, onDelete }) => {
  return items.length ? (
    <TransitionGroup component="ul" className={styles.list}>
      {items.map(({ name, id, number }) => {
        return (
          <CSSTransition key={id} timeout={250} classNames={popTransition}>
            <li className={styles.item}>
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
          </CSSTransition>
        );
      })}
    </TransitionGroup>
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
