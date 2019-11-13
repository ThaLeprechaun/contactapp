import Contacts from '../models/contacts';

export async function viewAllContacts() {
  return Contacts.find({ deletedAt: null }).sort({ firstName: 'asc' });
}

export async function viewAContact(contactID: string) {
  return Contacts.findById(contactID);
}

export async function findContact({
  phone,
  archived = false,
}: {
  phone?: string;
  archived?: boolean;
}) {
  const deletedAt = archived ? { $not: { $eq: null } } : { $eq: null };

  return Contacts.find({ $and: [{ phone }, { deletedAt }] });
}

type contactInfo = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
};

export async function createContact(contactObj: contactInfo) {
  const existingContact = await Contacts.find({
    email: contactObj.email,
    phone: contactObj.phone,
  });

  if (existingContact.length !== 0) {
    throw new Error('Contact already exists');
  }

  const contact = new Contacts(contactObj);

  return contact.save();
}

export async function deleteContact(contactID: string) {
  return Contacts.findOneAndUpdate(
    { _id: contactID },
    { deletedAt: new Date() },
  );
}

export async function editContact(
  contactID: string,
  contactObj: Partial<contactInfo>,
) {
  return Contacts.findOneAndUpdate({ _id: contactID }, contactObj, {
    new: true,
  });
}
