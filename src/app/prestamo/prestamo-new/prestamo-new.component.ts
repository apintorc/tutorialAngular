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
    clientes: Client[];
    juegos: Game[];

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
            clientes => {
                this.clientes = clientes;

                if (this.prestamo.cliente != null) {
                    let clientFilter: Client[] = clientes.filter(client => client.id == this.data.prestamo.cliente.id);
                    if (clientFilter != null) {
                        this.prestamo.cliente = clientFilter[0];
                    }
                }
            }
        );

        this.gameService.getGames().subscribe(
          juegos => {
              this.juegos = juegos;

              if (this.prestamo.juego != null) {
                  let gameFilter: Game[] = juegos.filter(game => game.id == this.data.prestamo.juego.id);
                  if (gameFilter != null) {
                      this.prestamo.juego = gameFilter[0];
                  }
              }
          }
      );
    }

    onSave() {
        this.prestamoService.savePrestamo(this.prestamo).subscribe(result => {
            this.dialogRef.close();
        });    
    }  

    onClose() {
        this.dialogRef.close();
    }

}
