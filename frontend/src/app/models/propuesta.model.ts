export class Propuesta {

    _id: String;
    nombre: String;
    descripcion: String;
    usuario: String;
    votos: String[];
    imagenes: String[];

    constructor(nombre  = '', descripcion = '') {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagenes = [];
        this.votos = [];
    }
}
