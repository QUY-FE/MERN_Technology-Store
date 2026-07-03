import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        trim: true
    },
    number: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ["Hoàn thành", "Đang xử lý", "Đã hủy"],
      default: "Đang xử lý",
    },
}, { 
    timestamps: true
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;