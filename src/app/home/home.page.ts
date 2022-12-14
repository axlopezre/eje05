import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: Products[];
  public products2: Products;
  public clave: string = '';
  public descripcion: string = '';
  public precio: number;
  public foto: string= '';
  @ViewChild('inputClave') inputClave: IonInput;
  @ViewChild('inputFoto') inputFoto: IonInput;
  @ViewChild('inputDescripcion') inputDescripcion: IonInput;
  @ViewChild('inputPrecio') inputPrecio: IonInput;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.products = this.productoService.getProductos();
    this.foto = 'https://www.apple.com/v/iphone-14-pro/a/images/meta/iphone-14-pro_overview__e2a7u9jy63ma_og.png';
    this.router.events.subscribe((observer) => {
      if (observer instanceof NavigationEnd) {
        if (observer.url === '/') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.products = this.productoService.getProductos();
  }

  public getProdyctByClave(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

  public abrirCarrito(clave: string): void {
    this.router.navigate(['/carrito'], {
      queryParams: { clave: clave },
    });
  }

  public obtenerCampos(
    clave: string,
    foto: string,
    descripcion: string,
    precio: number,
    cantidad: number
  ): Products {
    let item: Products = {
      clave,
      descripcion,
      precio,
      foto,
      cantidad,
    };
    return item;
  }

  public addProduct(products2act: Products) {
    if (!this.validaciones()) return;

    let producto = this.products.find((p) => {
      //si se encuentra un producto con la misma clave
      return p.clave === products2act.clave;
    });
    if (producto) {
      producto.cantidad ++;
      return; //Para que no siga avanzando
    }
    this.products = this.productoService.addProduct(products2act);
  }

  public validaciones(): Boolean {
    if (!this.clave.trim()) {
      this.presentAlert(this.inputClave);
      return false;
    }
    if (!this.foto.trim()) {
      this.presentAlert(this.inputFoto);
      return false;
    }
    if (!this.descripcion.trim()) {
      this.presentAlert(this.inputDescripcion);
      return false;
    }
    if (!this.precio) {
      this.presentAlert(this.inputPrecio);
      return false;
    }
    return true;
  }

  async presentAlert(input: IonInput) {
    let etiqueta = '';
    switch (input) {
      case this.inputClave:
        etiqueta = 'clave';
        break;
      case this.inputDescripcion:
        etiqueta = 'descipci??n';
        break;
      case this.inputPrecio:
        etiqueta = 'precio';
        break;
    }
    const alert = await this.alertController.create({
      header: 'Rellene:' + etiqueta,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    alert.onDidDismiss().then(() => {
      setTimeout(() => {
        input.setFocus();
      }, 100);
    });
    await alert.present();
  }
}

function isBlank() {
  throw new Error('Function not implemented.');
}
