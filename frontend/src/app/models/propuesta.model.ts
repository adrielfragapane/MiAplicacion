export class Propuesta {

    _id: String;
    nombre: String;
    descripcion: String;
    usuario: String;

    constructor(nombre='',descripcion='') {
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}
