import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestamo } from './model/Prestamo';
import { Pageable } from '../core/model/page/Pageable';
// import { PRESTAMO_DATA } from './model/mock-prestamos';
import { PrestamoPage } from './model/PrestamoPage';



@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(
    private http: HttpClient
  ) { }


  getPrestamos(pageable: Pageable, idGame?: number, clientId?: number, fechaInicio?: Date, fechaFin?: Date): Observable<PrestamoPage> {
    //return of(PRESTAMO_DATA);
    //return this.http.post<AuthorPage>('http://localhost:8080/author', {pageable:pageable});
    return this.http.post<PrestamoPage>(this.composeFindUrl(idGame, clientId, fechaInicio, fechaFin),{pageable:pageable});
  }

  savePrestamo(prestamo: Prestamo): Observable<void> {
    let url = 'http://localhost:8080/prestamo/';
    return this.http.put<void>(url, prestamo);
  }


  deletePrestamo(idPrestamo : number): Observable<any> {
    let url = 'http://localhost:8080/prestamo/';
    return this.http.delete<void>(url+idPrestamo);
  }

  // getAllPrestamos(): Observable<Prestamo[]> {
  //   return of(PRESTAMO_DATA);
  // }

  
  private composeFindUrl(gameId?: number, clientId?: number, fechaInicio?: Date, fechaFin?: Date) : string {
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

    if (fechaInicio != null) {
      if (params != '') params += "&";
      params += "fechaInicio="+fechaInicio;
    }

    if (fechaFin != null) {
      if (params != '') params += "&";
      params += "fechaFin="+fechaFin;
    }
  

    let url = 'http://localhost:8080/prestamo'

    if (params == '') return url;
    else return url + '?'+params;
}

}