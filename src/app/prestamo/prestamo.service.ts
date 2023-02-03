import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestamo } from './model/Prestamo';
import { Pageable } from '../core/model/page/Pageable';
// import { PRESTAMO_DATA } from './model/mock-prestamos';
import { PrestamoPage } from './model/PrestamoPage';
import { DatePipe } from '@angular/common'


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe
  ) { }
  getPrestamos(pageable: Pageable, idGame?: number, clientId?: number, fecha?: Date): Observable<PrestamoPage> {
    return this.http.post<PrestamoPage>(this.composeFindUrl(idGame, clientId, fecha),{pageable:pageable});
  }

  savePrestamo(prestamo: Prestamo): Observable<void> {
    let url = 'http://localhost:8080/prestamo/';
    return this.http.put<void>(url, prestamo);
  }


  deletePrestamo(idPrestamo : number): Observable<any> {
    let url = 'http://localhost:8080/prestamo/';
    return this.http.delete<void>(url+idPrestamo);
  }

  getAllPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>('http://localhost:8080/prestamo');
  }

  juegoReservado(idGame: number, fechaInicio: Date, fechaFin: Date) :Observable<Boolean>{
    return this.http.get<Boolean>(this.composeFindUrl2(idGame,fechaInicio,fechaFin));
    
  }

  clienteReserva(idClient: number, fechaInicio: Date, fechaFin: Date) :Observable<Boolean>{
    return this.http.get<Boolean>(this.composeFindUrl3(idClient,fechaInicio,fechaFin));
    
  }

  private composeFindUrl(gameId?: number, clientId?: number, fecha?: Date) : string {
    let params = '';

    if (gameId != null) {
        if (params != '') params += "&";
        params += "gameId="+gameId;
    }

    if (clientId != null) {
        if (params != '') params += "&";
        params += "clientId="+clientId;
    }
    
    if (fecha != null) {
      let fechaFormateada =this.datepipe.transform(fecha, 'MM-dd-yyyy');
      if (params != '') params += "&";
      params += "fecha="+fechaFormateada;
    }

    let url = 'http://localhost:8080/prestamo'

    if (params == '') return url;
    else return url + '?'+params;
}


  private composeFindUrl2(gameId: number, fechaInicio: Date, fechaFin: Date) : string {
    let params = '';

      if (params != '') params += "&";
      params += "gameId="+gameId;
    
      let fechaInicioFormateada =this.datepipe.transform(fechaInicio, 'MM-dd-yyyy');
      if (params != '') params += "&";
      params += "fechaInicio="+fechaInicioFormateada;

      let fechaFinFormateada =this.datepipe.transform(fechaFin, 'MM-dd-yyyy');
      if (params != '') params += "&";
      params += "fechaFin="+fechaFinFormateada;


    let url = 'http://localhost:8080/prestamo/juego-reservado'

    return url + '?'+params;
  }

  private composeFindUrl3(clientId: number, fechaInicio: Date, fechaFin: Date) : string {
    let params = '';

      if (params != '') params += "&";
      params += "clientId="+clientId;
    
      let fechaInicioFormateada =this.datepipe.transform(fechaInicio, 'MM-dd-yyyy');
      if (params != '') params += "&";
      params += "fechaInicio="+fechaInicioFormateada;

      let fechaFinFormateada =this.datepipe.transform(fechaFin, 'MM-dd-yyyy');
      if (params != '') params += "&";
      params += "fechaFin="+fechaFinFormateada;


    let url = 'http://localhost:8080/prestamo/cliente-reserva'

    return url + '?'+params;
  }


}