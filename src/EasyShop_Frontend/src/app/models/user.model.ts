import { Role } from './role.model';

export class User {
  constructor(
    public id?: number,
    public email?: string,
    public role?: Role,
    public password?: string,
 
  ) {}

  get roleString(): string | undefined {
    return this.role !== undefined ? Role[this.role] : undefined;
  }
}
