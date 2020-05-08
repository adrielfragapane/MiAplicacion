export class Usuario {

    _id: String;
    nombre: String;
    apellido: String;
    propuestas: String[];

    constructor(nombre='',apellido='') {
        this.nombre=nombre;
        this.apellido=apellido;
    }
}
