import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  public product: Products;
  
  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.product = this.productoService.getProdyctByClave(params.clave);
    });
  }
}
