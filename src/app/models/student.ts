export class Student {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public identification: string,
    public email: string,
    public photoUrl: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }

  static fromJSON(json: any): Student {
    return new Student(
      json.id,
      json.nombre,
      json.apellido,
      json.cedula,
      json.correo,
      json.foto_url,
      json.created_at,
      json.updated_at
    );
  }
}
