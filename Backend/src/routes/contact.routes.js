import express from 'express';
import { contactLimiter } from '../middleware/rateLimit.js';

import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../controllers/contact.controller.js';

const router = express.Router();



router.get('/', getContacts);
router.post('/create',contactLimiter, createContact);
router.get('/:id', getContactById);
router.put('/edit/:id', updateContact);
router.delete('/delete/:id', deleteContact);

export default router;