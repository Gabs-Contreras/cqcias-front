import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

export const routes: Routes = [
  {
    path: 'nuevo',
    component: ProductFormComponent
  },
  {
    path: 'editar/:id',
    component: ProductFormComponent
  },
  {
    path: 'producto/:id',
    component: ProductViewComponent
  },
  {
    path: 'productos',
    component: ProductViewComponent
  },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];
