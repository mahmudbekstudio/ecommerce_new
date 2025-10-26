import { InferSchemaType } from 'mongoose';
import User from '../model/User';

type UserType = InferSchemaType<typeof User.schema>

export default UserType;