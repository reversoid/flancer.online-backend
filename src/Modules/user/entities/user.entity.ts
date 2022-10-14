import { genSalt, hash } from 'bcrypt';
import { IUser } from '../models/user.model';
import * as bcrypt from 'bcrypt';

export class UserEntity implements IUser {
  _id?: string;
  email: string;
  passwordHash: string;
  name: { first: string; last: string };

  constructor(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.name = { ...user.name };
  }

  public async setPassword(password: string) {
    const salt = await genSalt();
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string) {
    return bcrypt.compare(password, this.passwordHash);
  }
}
