import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prestamo } from 'src/app/prestamo/model/Prestamo';
import { PrestamoService } from '../prestamo.service';
import { PrestamoNewComponent } from '../prestamo-new/prestamo-new.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-prestamo-list',
  templateUrl: './prestamo-list.component.html',
  styleUrls: ['./prestamo-list.component.scss']
})
export class PrestamoListComponent {
  //prestamos: Prestamo[];
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'namegame', 'nameclient', 'fechainicio', 'fechafin', 'action'];

  constructor(
    private prestamoService: PrestamoService,
    public dialog: MatDialog
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

    this.prestamoService.getPrestamos(pageable).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        prestamos => this.dataSource.data = prestamos
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
