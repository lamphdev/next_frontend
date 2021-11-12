export interface Page<T> {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    content: T[];
}