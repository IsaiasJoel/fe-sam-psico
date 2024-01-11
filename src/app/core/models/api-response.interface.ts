export interface ApiResponse {
    datetime: string; //fecha
    status: number; //http status
    successful: boolean;
    message: any; //mapa
    data: any;
    details: string;
}