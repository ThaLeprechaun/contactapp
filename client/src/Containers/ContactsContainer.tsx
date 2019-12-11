import React from 'react';
import { Grid, Container} from 'semantic-ui-react';
import { useGet } from 'restful-react';
import { Switch, Route } from 'react-router-dom';

import ContactsList from '../Components/ContactsList';
import ContactsDetail from '../Components/ContactsDetail';
import Loader from '../Components/Loader';
import ContactModal from '../Components/ContactModal';
import '../Components/style.css';
import SideMenu from '../Components/SideMenu';

function ContactsContainer() {
  const { data, error, loading } = useGet('/api/contacts');

  if (loading) {
    return <Loader />;
  }

  return (
    // <Container>
      <div className="holder">
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <div className="contact-header">
             <span className="header-content">CONTACTS</span><ContactModal />
            </div>
            {error ? 'Unable to get contacts, please refresh' : null}
            <SideMenu contacts={data.data}/>
            <ContactsList contacts={data.data} />
          </Grid.Column>
          <Grid.Column width={11}>
            <Switch>
              <Route path="/contact/:contactID">
                <ContactsDetail />
              </Route>
              <Route>
                <div className="welcome-note">
                  <h1>Welcome to the Contact App</h1>
                  <p>Please Select a Contact</p>
                </div>
              </Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    // </Container>
  );
}

export default ContactsContainer;
