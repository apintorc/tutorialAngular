import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestamo } from './model/Prestamo';
import { Pageable } from '../core/model/page/Pageable';
import { PRESTAMO_DATA } from './model/mock-prestamos';
import { PrestamoPage } from './model/PrestamoPage';


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor() { }

  getPrestamos(pageable: Pageable): Observable<PrestamoPage> {
    return of(PRESTAMO_DATA);
  }

  savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return of(null);
  }

  deletePrestamo(idAPrestamo : number): Observable<Prestamo[]> {
    return of(null);
  }

  // getAllPrestamos(): Observable<Prestamo[]> {
  //   return of(PRESTAMO_DATA);
  // }

}