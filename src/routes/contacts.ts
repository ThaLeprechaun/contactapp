import { Router } from 'express';
import joi from '@hapi/joi';

import {
  viewAllContacts,
  viewAContact,
  findContact,
  createContact,
  editContact,
  deleteContact,
} from '../controllers/contact';

const router = Router();

router.get('/', (_req, res) => {
  viewAllContacts()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      console.error(err);

      res
        .status(500)
        .json({ message: 'An error occurred. Please try again later' });
    });
});

router.get('/search', async (req, res) => {
  const body = req.body;

  const data = await findContact(body);

  if (data.length === 0) {
    res.status(200).json({ data: [] });

    return;
  }

  res.status(200).json({ data });
});

router.get('/:contactID', (req, res) => {
  const contactID = req.params.contactID;

  viewAContact(contactID)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Contact not found' });

        return;
      }

      res.status(200).json({ data });
    })
    .catch(err => {
      console.error(err);

      res
        .status(500)
        .json({ message: 'An error occurred. Please try again later' });
    });
});

router.post('/', async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow(''),
    phone: joi
      .string()
      .min(11)
      .max(14)
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/),
    company: joi
      .string()
      .trim()
      .allow(''),
  });

  const { error, value, ...rest } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });

    return;
  }

  try {
    const doc = await createContact(value);

    res.status(200).json({ data: doc.toJSON() });
  } catch (err) {
    res.status(400).json({ message: err.message });

    return;
  }
});

router.patch('/:contactID', async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase(),
    lastName: joi.ref('firstName'),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow(''),
    phone: joi
      .string()
      .min(11)
      .max(14)
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/),
    company: joi
      .string()
      .trim()
      .allow(''),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: 'Please pass only valid values', error });

    return;
  }

  const doc = await editContact(req.params.contactID, value);

  if (!doc) {
    res.status(404).json({ message: 'Contact to edit not found' });

    return;
  }

  res.status(200).json({ data: doc.toJSON() });
});

router.delete('/:contactID', async (req, res) => {
  const contactID = req.params.contactID;

  const doc = await deleteContact(contactID);

  if (!doc) {
    res.status(404).json({ message: 'Contact to delete not found' });

    return;
  }

  res.status(200).json({ data: doc.id });
});

export default router;
