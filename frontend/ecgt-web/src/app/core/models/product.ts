// Tipos para producto. Nos sirven tanto con Mock API como con Spring.
export type ProductCondition = 'NEW' | 'USED' | 'NUEVO' | 'USADO';

export type ProductStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';

export type ProductCategory =
  | 'TECHNOLOGY' | 'HOME' | 'ACADEMIC' | 'PERSONAL' | 'DECORATION' | 'OTHER'
  | 'Tecnología' | 'hogar' | 'académico' | 'personal' | 'decoración' | 'otro';

export interface Product {
  id: string;

  name: string;
  description: string;
  price: number;
  stock: number;
  condition: ProductCondition;

  category?: ProductCategory;
  status?: ProductStatus;
  imageUrl?: string;     // una imagen (legacy o portada)
  imageUrls?: string[];  // compatibilidad
  images?: string[];     // <-- imagenes
  nombre?: string;
  descripcion?: string;
  precio?: number;
  estadoProducto?: ProductCondition;
  createdAt?: string;
}
