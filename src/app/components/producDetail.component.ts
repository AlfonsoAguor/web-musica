import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'producDetail',
	templateUrl: '../views/producDetail.html',
	providers: [ProductoService]
})

export class ProductoDetailComponent{
	public productos: Producto;

	constructor(
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.productos = new Producto(0,'','',0,'');
	}

	ngOnInit(){
		console.log("producDetail.Componente.ts cargado...");

		this.getProductos();
	}

	getProductos(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._productoService.getProductos(id).subscribe(
				response => {
					if(response.code == 200){
						this.productos = response.data;
						console.log(this.productos);
					}else {
						this._router.navigate(['/productos']);
					}

				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}
}