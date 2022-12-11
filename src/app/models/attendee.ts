export class Attendee {
    constructor(
      public name: string,
      public identification: string,
      public timestamp: Date,
      public status: number,
      public photoUrl: string | null,
    ) { }
  }
