export class Group{

    constructor (
        public id:number,
        public asignatura:string,
        public codigo: string,
        public grupo: string,
        public periodo: string
    ){}


    static fromJSON(json: any): Group{
        return new Group(
            json.id,
            json.asignatura,
            json.codigo_asignatura,
            json.grupo,
            json.periodo
            );
        }
    }