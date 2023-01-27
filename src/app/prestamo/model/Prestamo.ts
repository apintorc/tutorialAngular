import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

export class Prestamo {
    id: number;
    juego: Game;
    cliente: Client;
    fecha_inicio: Date;
    fecha_fin: Date;
}
