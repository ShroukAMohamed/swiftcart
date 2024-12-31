import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  Cart:any[] = []
  constructor(private _HttpClient: HttpClient) {}
  getCategories(): Observable<any> {
    return this._HttpClient.get(environment.baseApi + 'products/categories')
  }
  getProductsByCategory(category: string): Observable<any> {
    return this._HttpClient.get(environment.baseApi + `products/category/${category}`);
  }
  getLimitProducts(limit: number): Observable<any> {
    return this._HttpClient.get(environment.baseApi + `products?limit=${limit}`);
  }
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(environment.baseApi + 'products');
  }
  getProductById(id: number): Observable<any> {
    return this._HttpClient.get(environment.baseApi + `products/${id}`);
  }
}
