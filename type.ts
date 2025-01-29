export class User {
  public id: string;
  public age: number;
  public email: string;
  public created_at: Date;

  constructor(id: string, age: number, email: string, created_at: Date) {
    this.id = id;
    this.age = age;
    this.email = email;
    this.created_at = created_at;
  }
}
