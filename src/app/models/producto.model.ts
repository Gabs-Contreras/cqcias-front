// src/app/models/product.model.ts

export class Producto {
  id: number;
  producto: string;
  codigobarras: number;
  marca: string;
  costo: number;
  estatus: string;

  constructor(id: number, producto: string, codigobarras: number, marca: string, costo: number, estatus: string) {
    this.id = id;
    this.producto = producto;
    this.codigobarras = codigobarras;
    this.marca = marca;
    this.costo = costo;
    this.estatus = estatus;
  }
}
