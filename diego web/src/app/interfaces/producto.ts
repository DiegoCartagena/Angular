export interface Producto {
    _id?: string;
    nombre?: string;
    imagen?:string;
    descripcion?:string;
    precio?: Number;
    cantidad?: Number;
}

export interface RespuestaProducto {
    ok: boolean;
    pagina : number;
    productos: Producto[];

}