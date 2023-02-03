import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';


@Component({
    selector: 'app-prestamo-new',
    templateUrl: './prestamo-new.component.html',
    styleUrls: ['./prestamo-new.component.scss']
})
export class PrestamoNewComponent implements OnInit {

    prestamo: Prestamo; 
    clients: Client[];
    games: Game[];
    tiempoExcedido: Boolean;
    fechaInicioSuperior: Boolean;
    juegoReservadoCliente: Boolean;
    clienteReservaJuego: Boolean;

    constructor(
        public dialogRef: MatDialogRef<PrestamoNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private prestamoService: PrestamoService,
        private clientService: ClientService,
        private gameService: GameService,
    ) { }

    ngOnInit(): void {
      this.prestamo = new Prestamo();

        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients;

                if (this.prestamo.client != null) {
                    let clientFilter: Client[] = clients.filter(client => client.id == this.data.prestamo.cliente.id);
                    if (clientFilter != null) {
                        this.prestamo.client = clientFilter[0];
                    }
                }
            }
        );

        this.gameService.getGames().subscribe(
          games => {
              this.games = games;

              if (this.prestamo.game != null) {
                  let gameFilter: Game[] = games.filter(game => game.id == this.data.prestamo.juego.id);
                  if (gameFilter != null) {
                      this.prestamo.game = gameFilter[0];
                  }
              }
          }
      );
    }


    onSave() {
        //El mismo juego no puede estar prestado a dos clientes distintos en un mismo día
        this.prestamoService.juegoReservado(this.prestamo.game.id, this.prestamo.fechaInicio, this.prestamo.fechaFin).subscribe(result => {
            if (result){
                this.juegoReservadoCliente = true;
                
            }else{
                this.juegoReservadoCliente = false;
            }
        })
        //Un mismo cliente no puede tener prestados más de 2 juegos en un mismo día. 
        this.prestamoService.clienteReserva(this.prestamo.client.id, this.prestamo.fechaInicio, this.prestamo.fechaFin).subscribe(result => {
            if (result){
                this.clienteReservaJuego = true;
                
            }else{
                this.clienteReservaJuego = false;
            }
        })

        let diferenciaFechas = new Date(this.prestamo.fechaFin).getTime() - new Date(this.prestamo.fechaInicio).getTime();
        var milisegundosDia = 86400000;
        var diasPrestamo = diferenciaFechas / milisegundosDia;
        //El periodo de préstamo máximo solo podrá ser de 14 días
        if (diasPrestamo>14){
            this.tiempoExcedido = true;
        // La fecha de fin NO podrá ser anterior a la fecha de inicio//
        }else if(diferenciaFechas<0){
            this.fechaInicioSuperior = true;
            this.tiempoExcedido = false;
        }else if (this.juegoReservadoCliente == false && this.clienteReservaJuego==false){
            this.prestamoService.savePrestamo(this.prestamo).subscribe(result => {
                this.dialogRef.close();
            });  
        }

    }
        
 
    

    onClose() {
        this.dialogRef.close();
    }

}
