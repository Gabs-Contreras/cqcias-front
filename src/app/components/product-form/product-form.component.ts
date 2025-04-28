
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductFormComponent implements OnInit {

  productoForm: FormGroup;
  productoId: number | null = null;
  isEditMode: boolean = false;
  alertMessage: string | null = null;
  alertClass: string = 'alert alert-success';

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      producto: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      costo: ['', [Validators.required, Validators.min(0)]],
      estatus: ['A']
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.productoId = id;
        this.cargarProducto(id);
      }
    });
  }

  cargarProducto(id: number): void {
    this.productService.getProducto(id).subscribe(producto => {
      this.productoForm.patchValue({
        producto: producto.producto,
        marca: producto.marca,
        costo: producto.costo,
        estatus: producto.estatus
      });
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const productoData: Producto = {
      ...this.productoForm.value,
      id: this.productoId
    };

    if (this.isEditMode) {
      if (this.productoId !== null) {
        this.productService.actualizarProducto(this.productoId, productoData).subscribe(
          () => {
            alert('Producto actualizado con éxito');
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error al actualizar el producto', error);
            alert('Hubo un error al actualizar el producto');
          }
        );
      } else {
        alert('ID de producto no válido para edición');
      }
    } else {
      this.productService.crearProducto(productoData).subscribe(
        () => {
          alert('Producto agregado con éxito');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al agregar el producto', error);
          alert('Hubo un error al agregar el producto');
        }
      );
    }
  }


  cancelar(): void {
    this.router.navigate(['/']);
  }
}
