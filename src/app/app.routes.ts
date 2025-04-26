import { Routes } from '@angular/router';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductCrudComponent
  },
  {
    path: 'todos',
    component: ProductCrudComponent
  },
  {
    path: 'nuevo',
    component: ProductFormComponent
  },
  {
    path: 'editar/:id',
    component: ProductFormComponent
  },
  {
    path: 'ver/:id',
    component: ProductViewComponent
  }
];
