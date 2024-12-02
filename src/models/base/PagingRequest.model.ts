import { Sort } from "../../utils/enum/app.enum";

export interface IPagingRequest {
    pageNumber: number,
    pageSize: number,
    sort?: Sort,
    sortBy?: string,
    searchKey?: string,
    searchBy?: string
}