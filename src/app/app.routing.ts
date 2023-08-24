//Modulos necesarios para el routing
import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/producList.component';
import { ProductoAddComponent } from './components/producAdd.component';
import { ProductoDetailComponent } from './components/producDetail.component';
import { ProductoEditarComponent } from './components/producEdit.component';

//Con esto creamos una array de tipo JSON donde se estableceran las rutas
const appRoutes: Routes = [
	//al dejar la path vacia se establecera la ruta que le indiquemos como la index o home
	{path: '', component : HomeComponent},
	{path: 'home', component : HomeComponent},

	//se establece la rutas con el nombre que le indiquemos al componente
	{path: 'productos', component: ProductosListComponent},
	{path: 'nuevo-producto', component: ProductoAddComponent},
	{path: 'producto/:id', component: ProductoDetailComponent},
	{path: 'editar/:id', component: ProductoEditarComponent},

	//con los dos* se establece como la pagina de error
	{path: '**', component: ErrorComponent}

];

//se exporta para poder funcionar
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);