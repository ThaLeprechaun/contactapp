import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useGet } from 'restful-react';
import './style.css';

type ContactProps = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  updatedAt: Date;
  createdAt: Date;
};

function ContactsDetail() {
  const { contactID } = useParams();
  const { error, loading, data } = useGet<{ data: ContactProps }>(
    `/api/contacts/${contactID}`,
  );

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="contact-info">
      {error && <p>There was an error, please refresh</p>}
      <Header icon textAlign="center">
        <Icon name="user" circular />
        <p>{data.data.firstName} {data.data.lastName}</p>
        <Header.Content>
          <h3>Phone</h3>
          <p>{data.data.phone}</p>
          <h3>Email</h3>
          <p>{data.data.email}</p>
          <h3>Company</h3>
          <p>{data.data.company}</p>
          <button>Edit</button>
          <button>Delete</button>
        </Header.Content>
      </Header>
    </div>
  );
}

export default ContactsDetail;
