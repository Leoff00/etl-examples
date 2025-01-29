export class User {
  public id: string;
  public age: string;
  public email: string;
  public created_at: Date;

  constructor(id: string, age: string, email: string, created_at: Date) {
    this.id = id;
    this.age = age;
    this.email = email;
    this.created_at = created_at;
  }
}
