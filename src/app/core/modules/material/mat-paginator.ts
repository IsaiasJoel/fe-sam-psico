import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorImpl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Items por página';
    override nextPageLabel = 'Siguiente';
    override previousPageLabel = 'Anterior';
    override lastPageLabel = 'Última Página';
    override firstPageLabel = 'Primera Página';

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        // Calcular el índice final
        let endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        // Devolver la etiqueta del rango
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
}
