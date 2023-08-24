import { Component } from '@angular/core';
@Component({
 	selector: 'home',
 	templateUrl: '../views/home.html'
})

export class HomeComponent{
	public titulo: string;
	constructor(){
		this.titulo = 'WebbApp de productos con Angular';
	}

	ngOnInit(){
		console.log('Se ha cargado el Component de home.component.ts');
	}
}