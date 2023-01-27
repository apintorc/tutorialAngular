import { MockDate } from "./MockDate";
import { PrestamoPage } from "./PrestamoPage";

export const PRESTAMO_DATA: PrestamoPage = {
    content: [
        { id: 1, juego: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, cliente: { id: 1, name: 'Alex' }, fecha_inicio: new MockDate, fecha_fin: new MockDate },
        { id: 2, juego: { id: 2, title: 'Juego 2', age: 6, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, cliente: { id: 2, name: 'Jaime' }, fecha_inicio: new MockDate, fecha_fin: new MockDate },
        { id: 3, juego: { id: 3, title: 'Juego 3', age: 6, category: { id: 2, name: 'Categoría 3' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } },cliente: { id: 3, name: 'Pedro' }, fecha_inicio: new MockDate, fecha_fin: new MockDate },
    ],
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 7
}
