import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
	selector: 'producList',
	templateUrl: '../views/productosList.html',
	providers: [ProductoService]
})

export class ProductosListComponent{
	public titulo:string;
	public productos: Producto[]=[];
	public confirmado: any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService
		){
		this.titulo = 'Listado de productos';
		this.confirmado = null;
	}

	ngOnInit(){
		console.log("producList.component cargado");
		this.getProductos();
	}

	getProductos(){
			this._productoService.getProducto().subscribe(
			result => {
				this.productos = result;
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	cancelarConfirm(){
		this.confirmado = null;
	}
	
	borrarConfirm(id:any){
		this.confirmado = id;
		console.log(this.confirmado);
	}

	onDeleteProducto(id:any){
		this._productoService.deleteProducto(id).subscribe(
			response => {
				if(response.code == 200){
					this.getProductos();
				}else{
					alert('Error al borrar el producto');
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}