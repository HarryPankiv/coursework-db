import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class OrderDomain {
	createOrder(data: any) {
		return api.makeRequest("api/order", RequestType.POST, data);
	}
}

export const orderDomain = new OrderDomain();
