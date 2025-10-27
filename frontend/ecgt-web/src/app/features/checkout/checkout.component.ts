import { Component, computed } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  constructor(
    private cart: CartService,
    private router: Router,
    private checkoutSrv: CheckoutService,
    private auth: AuthService
  ) {}
  items = this.cart.items;
  total = computed(() => this.cart.total());

  name = '';
  card = '';
  exp = '';
  cvv = '';

  cardValid() {
    return /^[0-9]{13,19}$/.test(this.card);
  }
  expValid() {
    return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(this.exp);
  }
  cvvValid() {
    return /^[0-9]{3,4}$/.test(this.cvv);
  }
  formValid() {
    return (
      this.name.trim() && this.cardValid() && this.expValid() && this.cvvValid()
    );
  }

  submit(form: NgForm) {
    if (!this.formValid()) {
      form.control.markAllAsTouched();
      alert('⚠️ Completa correctamente todos los campos antes de continuar.');
      return;
    }

    const user = this.auth.user(); // ← viene del login
    if (!user) {
      alert('⚠️ Debes iniciar sesión para continuar.');
      return;
    }

    const payload = {
      userId: user.id,
      metodoPago: 'TARJETA',
      items: this.items().map((i) => ({
        productId: i.product.id,
        qty: i.qty,
      })),
    };

    this.checkoutSrv.checkout(payload).subscribe({
      next: (res) => {
        alert(
          `✅ Orden creada #${res.id}\nEntrega estimada: ${res.fechaEntregaEstimada}`
        );
        this.cart.clear();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        const msg = err?.error?.message ?? '❌ Error al procesar el pedido';
        alert(msg);
      },
    });
  }
}
