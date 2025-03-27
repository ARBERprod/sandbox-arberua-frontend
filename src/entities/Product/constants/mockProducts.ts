import { DetailedProduct } from '../model/types';
import { getMockProducts, getMockProduct, getMockDetailedProduct } from '../lib/getMockProducts';

export const mockProduct = getMockProduct();
export const mockProducts = getMockProducts();
export const mockSaleProducts = getMockProducts({ sale: true });
export const mockDetailedProduct: DetailedProduct = getMockDetailedProduct();
