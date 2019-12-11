import React from 'react'
import { Button, Header, Image, Modal} from 'semantic-ui-react';
import Form from './Form';

const ContactModal = () => (
  <Modal trigger={<Button>+</Button>} centered={false}>
    <Modal.Header>Add new Contact</Modal.Header>
    <Modal.Content>
      <Form />
      {/* <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description> */}
    </Modal.Content>
  </Modal>
)

export default ContactModal;
