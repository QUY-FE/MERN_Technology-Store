import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {type: String, require: true },
    password: {type: String, require: true},
    role: {type: String, enum:["user","admin"], require: true},

},{ timestamps: true });

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword,this.password);
}

export default mongoose.model("User", userSchema);