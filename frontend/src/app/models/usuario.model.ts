export class Usuario {

    _id: String;
    nombre: String;
    apellido: String;
    propuestas: String[];
    propuestasVotadas: String[];

    constructor(nombre = '', apellido = '') {
        this.nombre = nombre;
        this.apellido = apellido;
    }
}
