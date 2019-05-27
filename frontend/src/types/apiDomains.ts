import { AxiosPromise } from "axios";

export interface IItemDomain {
	getAll: () => AxiosPromise<Array<{ id: number; name: string }>>;
}
