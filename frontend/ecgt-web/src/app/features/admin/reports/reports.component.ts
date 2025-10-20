/**
 * AdminReportsComponent
 * ----------------------
 * Panel de reportes con pestañas + filtros de fecha (desde/hasta).
 * Mock hoy; mañana el servicio llamará a Spring Boot con estos filtros.
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AdminReportsService,
  ProductReport, ClientReport, Sanction, Notification, ReportRange
} from '../../../core/services/admin-reports.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class AdminReportsComponent {
  private reports = inject(AdminReportsService);

  // ---- estado UI
  loading = true;
  activeTab: string = 'top-products';

  // ---- filtros (date inputs). Por defecto últimos 7 días.
  dateFrom = this.toDateInput(new Date(Date.now() - 6 * 86400000)); // hoy-6
  dateTo   = this.toDateInput(new Date());                          // hoy

  // ---- datos
  topProducts: ProductReport[] = [];
  topClientsRevenue: ClientReport[] = [];
  topClientsSales: ClientReport[] = [];
  topClientsOrders: ClientReport[] = [];
  topClientsProducts: ClientReport[] = [];
  sanctions: Sanction[] = [];
  notifications: Notification[] = [];

  // ---- charts config
  chartTopProducts: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartTopProductsOpts: ChartOptions<'bar'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  chartClientsRevenue: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartClientsRevenueOpts: ChartOptions<'bar'> = { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  chartClientsSales: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartClientsSalesOpts: ChartOptions<'bar'> = { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  chartClientsOrders: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartClientsOrdersOpts: ChartOptions<'bar'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  chartClientsProducts: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartClientsProductsOpts: ChartOptions<'bar'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  chartSanctions: ChartConfiguration<'doughnut'>['data'] = { labels: ['Activas', 'Resueltas'], datasets: [{ data: [0, 0] }] };
  chartSanctionsOpts: ChartOptions<'doughnut'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

  chartNotifications: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartNotificationsOpts: ChartOptions<'line'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, elements: { point: { radius: 3 } } };

  ngOnInit() { this.applyFilters(); }

  /** Aplica filtros de fecha a todos los reportes */
  applyFilters() {
    this.loading = true;
    const range: ReportRange = {
      start: this.toISOStart(this.dateFrom),
      end:   this.toISOEnd(this.dateTo),
    };

    this.reports.getTopProducts(range).subscribe(r => { this.topProducts = r; this.buildTopProductsChart(); });
    this.reports.getTopClientsByRevenue(range).subscribe(r => { this.topClientsRevenue = r; this.buildClientsRevenueChart(); });
    this.reports.getTopClientsBySales(range).subscribe(r => { this.topClientsSales = r; this.buildClientsSalesChart(); });
    this.reports.getTopClientsByOrders(range).subscribe(r => { this.topClientsOrders = r; this.buildClientsOrdersChart(); });
    this.reports.getTopClientsByProducts(range).subscribe(r => { this.topClientsProducts = r; this.buildClientsProductsChart(); });
    this.reports.getSanctions(range).subscribe(r => { this.sanctions = r; this.buildSanctionsChart(); });
    this.reports.getNotifications(range).subscribe(r => { this.notifications = r; this.buildNotificationsChart(); });

    setTimeout(() => this.loading = false, 350);
  }

  /** Limpia filtros a últimos 7 días */
  resetFilters() {
    this.dateFrom = this.toDateInput(new Date(Date.now() - 6 * 86400000));
    this.dateTo   = this.toDateInput(new Date());
    this.applyFilters();
  }

  // -------- helpers de fechas
  private toDateInput(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  private toISOStart(dateStr: string): string | undefined {
    if (!dateStr) return undefined;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0).toISOString();
  }
  private toISOEnd(dateStr: string): string | undefined {
    if (!dateStr) return undefined;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 23, 59, 59, 999).toISOString();
  }

  // -------- builders de charts
  private buildTopProductsChart() {
    this.chartTopProducts = {
      labels: this.topProducts.map(p => p.productName),
      datasets: [{ data: this.topProducts.map(p => p.totalSold), label: 'Vendidos' }]
    };
  }
  private buildClientsRevenueChart() {
    this.chartClientsRevenue = {
      labels: this.topClientsRevenue.map(c => c.clientName),
      datasets: [{ data: this.topClientsRevenue.map(c => c.value), label: 'Ganancias (GTQ)' }]
    };
  }
  private buildClientsSalesChart() {
    this.chartClientsSales = {
      labels: this.topClientsSales.map(c => c.clientName),
      datasets: [{ data: this.topClientsSales.map(c => c.value), label: 'Productos vendidos' }]
    };
  }
  private buildClientsOrdersChart() {
    this.chartClientsOrders = {
      labels: this.topClientsOrders.map(c => c.clientName),
      datasets: [{ data: this.topClientsOrders.map(c => c.value), label: 'Pedidos' }]
    };
  }
  private buildClientsProductsChart() {
    this.chartClientsProducts = {
      labels: this.topClientsProducts.map(c => c.clientName),
      datasets: [{ data: this.topClientsProducts.map(c => c.value), label: 'Productos publicados' }]
    };
  }
  private buildSanctionsChart() {
    const active = this.sanctions.filter(s => s.active).length;
    const resolved = this.sanctions.length - active;
    this.chartSanctions = { labels: ['Activas', 'Resueltas'], datasets: [{ data: [active, resolved] }] };
  }
  private buildNotificationsChart() {
    const map = new Map<string, number>();
    for (const n of this.notifications) {
      const d = new Date(n.sentAt);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    const labels = Array.from(map.keys()).sort();
    const values = labels.map(k => map.get(k) ?? 0);
    this.chartNotifications = { labels, datasets: [{ data: values, label: 'Notificaciones enviadas' }] };
  }

  setTab(tab: string) { this.activeTab = tab; }
}
