import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prestamo } from 'src/app/prestamo/model/Prestamo';
import { PrestamoService } from '../prestamo.service';
import { PrestamoNewComponent } from '../prestamo-new/prestamo-new.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
@Component({
  selector: 'app-prestamo-list',
  templateUrl: './prestamo-list.component.html',
  styleUrls: ['./prestamo-list.component.scss']
})
export class PrestamoListComponent {
  //prestamos: Prestamo[];
  games : Game[];
  clients: Client[];
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'namegame', 'nameclient', 'fechaInicio', 'fechaFin', 'action'];
  filterGame: Game;
  filterClient: Client;
  filterFechaInicio: Date;
  filterFechaFin: Date;

  constructor(
    private prestamoService: PrestamoService,
    public dialog: MatDialog,
    private clientService: ClientService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
    }

    if (event != null) {
        pageable.pageSize = event.pageSize
        pageable.pageNumber = event.pageIndex;
    }

    this.gameService.getGames().subscribe(
      games => this.games = games
    );

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

    this.prestamoService.getPrestamos(pageable).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        prestamos => this.dataSource.data = prestamos
    });


}  

onCleanFilter(): void {
  this.filterGame = null;
  this.filterClient = null;
  this.filterFechaInicio = null;
  this.filterFechaFin = null;

  this.onSearch();
}

onSearch(): void {
  
  let gameId = this.filterGame != null ? this.filterGame.id : null;
  let clientId = this.filterClient != null ? this.filterClient.id : null;
  let fechaInicio = this.filterFechaInicio;
  let fechaFin = this.filterFechaFin;
  let pageable : Pageable =  {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    sort: [{
        property: 'id',
        direction: 'ASC'
    }]
  }


  this.prestamoService.getPrestamos(pageable, gameId, clientId, fechaInicio, fechaFin).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
}


  createPrestamo() {    
    const dialogRef = this.dialog.open(PrestamoNewComponent, {
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
    });    
}  

  deletePrestamo(prestamo: Prestamo) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prestamoService.deletePrestamo(prestamo.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  
}
