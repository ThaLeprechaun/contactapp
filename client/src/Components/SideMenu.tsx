import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

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

export default function SideMenu({contacts}: ContactsListProps) {
  const list = contacts.map(contact=>(
    <Menu key={contact._id}>
      <Menu.Item as={Link} to={`/contact/${contact._id}`}>
        {/* <Menu.Header as={Link} to={`/contact/${contact._id}`}> */}
          <div className="contact-detail">
            <div className="circle">
              <div className="circle-text">{contact.firstName[0].toUpperCase()} {contact.lastName[0].toUpperCase()}</div>
            </div>
            <div className="contact-name">
              {contact.firstName} {contact.lastName}
            </div>
          </div>
        {/* </Menu.Header> */}
      </Menu.Item>
    </Menu>
  ))
  return (
    <div>
      {list}
    </div>
  )
}


// export default class SideMenu extends Component {
//   state = { activeItem: " " }

//   // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <Menu pointing secondary vertical>
//         <Menu.Item
//           // name='home'
//           // active={activeItem === 'home'}
//           // onClick={this.handleItemClick}
//         />
//       </Menu>
//     )
//   }
// }
