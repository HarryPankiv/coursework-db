import { api } from "../adapter";
import { RequestType } from "../adapterTypes";
import { IItemDomain } from "../../types/apiDomains";

class ItemDomain implements IItemDomain {
	getItems() {
		return api.makeRequest<Array<{ id: number; name: string }>>("api/item", RequestType.GET);
	}
}

export const itemDomain = new ItemDomain();
