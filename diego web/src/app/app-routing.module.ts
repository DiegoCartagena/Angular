import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { NoticiaCompletaGuard } from './guards/noticia-completa.guard';


const routes: Routes = [
  { path: 'inicio', loadChildren: ()=> 
import('./Component/inicio/inicio.module').then(m => m.InicioModule)},
{ path: 'noticias', loadChildren: ()=> 
import('./Component/noticias/noticias.module').then(m => m.NoticiasModule)},
{ path: 'noticiaCompleta', loadChildren: ()=> 
import('./component/noticia-completa/noticia-completa.module').then(m => m.NoticiaCompletaModule), canActivate: [NoticiaCompletaGuard]},
{ path: 'mensajes', loadChildren: ()=> 
import('./Component/mensajes/mensajes.module').then(m => m.MensajesModule),
 canActivate: [LoginGuard]
},
{ path: 'ajustes', loadChildren: ()=> 
import('./Component/ajustes/ajustes.module').then(m => m.AjustesModule), 
canActivate: [LoginGuard]
},
{path: '', pathMatch: 'full', redirectTo: 'inicio'},
{path: '**', pathMatch: 'full', redirectTo: 'inicio'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
