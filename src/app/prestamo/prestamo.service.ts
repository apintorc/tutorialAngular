import { HttpClient } from '@angular/common/http';
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

  constructor(
    private http: HttpClient
  ) { }


  getPrestamos(pageable: Pageable, idGame?: number, clientId?: number, fecha_inicio?: Date, fecha_fin?: Date): Observable<PrestamoPage> {
    //return of(PRESTAMO_DATA);
    //return this.http.post<AuthorPage>('http://localhost:8080/author', {pageable:pageable});
    return this.http.post<PrestamoPage>(this.composeFindUrl(idGame, clientId, fecha_inicio, fecha_fin),{pageable:pageable});
  }

  savePrestamo(prestamo: Prestamo): Observable<void> {
    let url = 'http://localhost:8080/game';

    if (prestamo.id != null) {
        url += '/'+prestamo.id;
    }

    return this.http.put<void>(url, prestamo);
  }


  deletePrestamo(idAPrestamo : number): Observable<Prestamo[]> {
    return of(null);
  }

  // getAllPrestamos(): Observable<Prestamo[]> {
  //   return of(PRESTAMO_DATA);
  // }

  
  private composeFindUrl(gameId?: number, clientId?: number, fecha_inicio?: Date, fecha_fin?: Date) : string {
    let params = '';

    if (gameId != null) {
        //params += 'title='+title;
        if (params != '') params += "&";
        params += "gameId="+gameId;
    }

    if (clientId != null) {
        if (params != '') params += "&";
        params += "clientId="+clientId;
    }

    if (fecha_inicio != null) {
      if (params != '') params += "&";
      params += "fecha_inicio="+fecha_inicio;
    }

    if (fecha_fin != null) {
      if (params != '') params += "&";
      params += "fecha_fin="+fecha_fin;
    }
  

    let url = 'http://localhost:8080/prestamo'

    if (params == '') return url;
    else return url + '?'+params;
}

}