// Tipos para producto. Nos sirven tanto con Mock API como con Spring.
export type Condition = 'NEW' | 'USED';
export type ProductStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PAUSED';

export interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stock: number;
  condition: Condition;
  status: ProductStatus;
}
