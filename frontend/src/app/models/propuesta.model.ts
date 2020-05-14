export class Propuesta {

    _id: String;
    nombre: String;
    descripcion: String;
    usuario: String;
    votos: String[];
    imagenes: String[];
    ubicacion: {
        direccion: String,
        latitud: Number,
        longitud: Number
    }

    constructor(nombre  = '', descripcion = '') {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagenes = [];
        this.votos = [];
        this.ubicacion = {direccion: '', latitud: 0, longitud: 0};
    }
}
