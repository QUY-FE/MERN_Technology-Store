import Contact from '../models/contact.model.js';

// [CREATE] - POST /api/contact
export const createContact = async (req, res) => {
    try {
        const { username, number, description } = req.body;

        if (!username || !number || !description) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin.' });
        }

        const newContact = new Contact({ username, number, description });
        await newContact.save();

        return res.status(201).json(newContact);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi máy chủ.', error: error.message });
    }
};

// [READ ALL] - GET /api/contact
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi máy chủ.', error: error.message });
    }
};

// [READ ONE] - GET /api/contact/:id
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy contact.' });
        }

        return res.status(200).json(contact);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi định dạng ID hoặc lỗi máy chủ.', error: error.message });
    }
};

// [UPDATE] - PUT /api/contact/:id
export const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy contact để cập nhật.' });
        }

        return res.status(200).json(updatedContact);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi máy chủ.', error: error.message });
    }
};

// [DELETE] - DELETE /api/contact/:id
export const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy contact để xóa.' });
        }

        return res.status(200).json({ success: true, message: 'Xóa contact thành công.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi máy chủ.', error: error.message });
    }
};