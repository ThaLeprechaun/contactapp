import React from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './style.css';

type ContactsListProps = {
  contacts: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    company?: string;
    updatedAt: Date;
    createdAt: Date;
  }[];
};

function ContactsList({ contacts }: ContactsListProps) {
  console.log(contacts)
  const list = contacts.map(contact => (
    <List key={contact._id} divided relaxed>
      <List.Item>
        {/* <List.Icon name="github" size="large" verticalAlign="middle" /> */}
        <List.Content>
          <List.Header as={Link} to={`/contact/${contact._id}`}>
            <div className="contact-detail">
              <div className="circle">
                <div className="circle-text">{contact.firstName[0].toUpperCase()} {contact.lastName[0].toUpperCase()}</div>
              </div>
              <div className="contact-name">
                {contact.firstName} {contact.lastName}
              </div>
            </div>
          </List.Header>
          {/* <List.Description>Updated {contact.updatedAt}</List.Description> */}
        </List.Content>
      </List.Item>
    </List>
  ));

  return <>{list}</>;
}

export default ContactsList;
