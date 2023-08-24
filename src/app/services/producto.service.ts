import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import { fromEvent, map } from 'rxjs';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';

@Injectable()
export class ProductoService{
	public url: string;

	constructor( public _http:HttpClient ){
		this.url = GLOBAL.url;
	}

	getProducto(){
		 return this._http.get(this.url+'/productos').pipe(map((response:any)=> response.data));
		/*return this._http.get(this.url+'productos').pipe(map(res=> res));*/
	}

	getProductos(id:any){
		return this._http.get(this.url+'producto/'+id).pipe(map((response:any)=> response));
	}

	addProducto(producto: Producto){
		let json = JSON.stringify(producto);
		let params = 'json='+json;
		let headers = new HttpHeaders({'Content-type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'productos', params, {headers: headers}).pipe(map((response:any)=> response.data));
	}

	editProducto(id:any, producto:Producto){
		let json = JSON.stringify(producto);
		let params = 'json='+json;
		let headers = new HttpHeaders({'Content-type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'actualizar/'+id, params, {headers: headers}).pipe(map((response:any)=> response));
	}

	deleteProducto(id:any){
		return this._http.get(this.url+'eliminar/'+id).pipe(map((response:any)=> response));
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('uploads[]', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}
}