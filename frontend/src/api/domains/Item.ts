import { api } from "../adapter";
import { RequestType } from "../adapterTypes";
import { IItemDomain } from "../../types/apiDomains";

class ItemDomain implements IItemDomain {
	getAll() {
		return api.makeRequest<Array<{ id: number; name: string }>>("api/item", RequestType.GET);
	}

	getOptions() {
		return api.makeRequest("api/item/options", RequestType.GET);
	}

	create(data: any) {
		return api.makeRequest("api/item", RequestType.POST, data);
	}

	getOne(id: number) {
		return api.makeRequest(`api/item/${id}`, RequestType.GET);
	}

	update(id: number, data: any) {
		return api.makeRequest(`api/item/${id}`, RequestType.PUT, data);
	}

	delete(id: number) {
		return api.makeRequest(`api/item/${id}`, RequestType.DELETE);
	}
}

export const itemDomain = new ItemDomain();
