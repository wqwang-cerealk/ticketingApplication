import mongoose from "mongoose";
import { Password } from "../services/password";

//An interface that describes the requirements of creating a new User
//So Typescript know what properties a User has
interface UserAttrs {
    email: string;
    password: string;
} 

//An interface that describes the properties a user model (collection) has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties that a User Document has (single User)
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        //doc is the original user doc and ret is the object we want to return 
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

//hash the password
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

//customize function in a model in Mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

//this function will return a UserModel (second type in <>)
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

//we do not call new User() directly to make sure Typescript can check if the arguments matches required properties
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// };

export { User };