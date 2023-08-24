import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'producEdit',
	templateUrl: '../views/productAdd.html',
	providers: [ProductoService]
})

export class ProductoEditarComponent{
	public titulo:string;
	public producto: Producto;
	public filesToUpload:any;
	public resultUpload:any;
	public is_edit: any;

	constructor(
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.titulo="Modificar producto";
		this.producto = new Producto(0,'','',0,'');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log(this.titulo);
		this.getProductos();
	}

	getProductos(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._productoService.getProductos(id).subscribe(
				response => {
					if(response.code == 200){
						this.producto = response.data;
						console.log(this.producto);
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

	onSubmit(){
		console.log(this.producto);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.producto.imagen = this.resultUpload.filename;
				this.updateProducto();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.updateProducto();	
		}

	}

	updateProducto(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.editProducto(id, this.producto).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/producto', id]);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		})
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}