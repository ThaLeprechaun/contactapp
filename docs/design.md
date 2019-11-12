# Contact App

The contact app helps to manage user contacts and has the following functionality.

- Create a new contact
  - Create contact given the following params
    - First name
    - Last name
    - Email
    - Phone
    - Company
  - Contacts should not be created if an existing contact exists with the same email or phone number.
  - Contact creation time should be tracked.

- Edit a contact
  - Edit or add new information to an existing contact with the same parameters that was used in the contact creation
  - Editing should not be possible on a contact that doesn't exist and should not create a new one.
  - Updated time for contacts should be tracked.

- Delete a contact
  - Delete an existing contact
  - Deleted contacts should not show up in view contacts
  - Deleted contacts are only archived, not removed entirely from the system.
  - Deletion time for contacts should be tracked.

- View Contacts
  - View all contacts
  - View specific contact
    - By ID
    - By phone
  - Contacts that have been archived should not show up.
  - View archived (deleted) contacts

* Archived contacts should only be kept for 30 days.
