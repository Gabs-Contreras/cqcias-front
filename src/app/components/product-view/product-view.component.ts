import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductViewComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProductosActivos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos activos', error);
      }
    );
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.eliminarProducto(id).subscribe(
        () => {
          this.productos = this.productos.filter(producto => producto.id !== id);
          alert('Producto eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
          alert('Hubo un error al eliminar el producto');
        }
      );
    }
  }

  agregarProducto(): void {
    this.router.navigate(['/nuevo']);
  }

  editarProducto(id: number): void {
    this.router.navigate([`/editar/${id}`]);
  }
}
