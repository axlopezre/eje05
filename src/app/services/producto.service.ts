import { Injectable } from '@angular/core';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Products[];
  constructor() {
    this.productos = [];
  }
  public getProductos(): Products[] {
    return this.productos;
  }

  public getProdyctByClave(clave: string): Products {
    let item: Products = this.productos.find((producto) => {
      return producto.clave === clave;
    });
    return item;
  }

  public addProduct(product: Products) {
    this.productos.push(product); //Servidor agrega producto
    return this.productos; //Respuesta del servidor
  }

  public removeProduct(product: Products) {
    this.productos = this.productos.filter((p) => {
      return p !== product;
    });
    return this.productos;
  }
}
