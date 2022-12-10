import { Time } from "@angular/common";

export class Attendance{

    constructor (
        public id:number,
        public fecha:Date,
        public hora: Time,
        public est_id:number,
        public asi_id:number,
        public estado:number,
        public nombre_asignatura: string, 
        public codigo_asignatura: string
    ){}


    static fromJSON(json: any, dict:Map<string, string[]>): Attendance{
        return new Attendance(
            json.id,
            json.fecha,
            json.hora,
            json.estudiante_id,
            json.grupo_asignatura_id,
            json.estado_asistencia_id,
            dict.get(String(json.grupo_asignatura_id))[0],
            dict.get(String(json.grupo_asignatura_id))[1]
            );
        }
    }