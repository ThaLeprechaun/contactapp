import React, {useState} from 'react';
import axios from 'axios';

export default function Form(props: any) {
  const[contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: ""
  });
  function handleChange(e: any) {
    setContact({...contact, [e.target.name]: e.target.value})
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    if(!contact.firstName || !contact.lastName || !contact.email || !contact.phone || !contact.company) {
      window.alert('All fields are required');
      return;
    }
    const newContact = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      company: contact.company
    };

    axios.post('http://localhost:3000/api/contacts', newContact).then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    });

    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: ""
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="" value={contact.firstName} placeholder="Enter Firstname" autoComplete="off" name="firstName" onChange={handleChange}/>
      <input type="text" value={contact.lastName} placeholder="Enter Lastname" autoComplete="off" name="lastName" onChange={handleChange}/>
      <input type="email" value={contact.email} placeholder="Enter Email" autoComplete="off" name="email" onChange={handleChange}/>
      <input type="text" value={contact.phone} placeholder="Enter Phone" autoComplete="off" name="phone" onChange={handleChange}/>
      <input type="text" value={contact.company} placeholder="Enter Company" autoComplete="off" name="company" onChange={handleChange}/>
      <button>Add</button>
    </form>
  )
}
