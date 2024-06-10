import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) {}

  getDatos(tabla: string) {
    return this.http.get<any[]>(`/api/datos/${tabla}`);
  }
}
