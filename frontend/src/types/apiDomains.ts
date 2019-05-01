import { AxiosPromise } from "axios";

export interface IItemDomain {
	getItems: () => AxiosPromise<Array<{ id: number; name: string }>>;
}
