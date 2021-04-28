import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ModalsComponent } from './shared/modals/modals.component';
import{FormsModule} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

import{registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ProductosComponent } from './Component/productos/productos.component';



registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ModalsComponent,
    ProductosComponent

 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide :LOCALE_ID,
    useValue: 'es'
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
