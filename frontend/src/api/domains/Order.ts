import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class OrderDomain {
	createOrder(data: any) {
		return api.makeRequest("api/order", RequestType.POST, data);
	}

	getOrders() {
		return api.makeRequest("api/order", RequestType.GET);
	}

	getOrder(id: number) {
		return api.makeRequest(`api/order/${id}`, RequestType.GET);
	}
}

export const orderDomain = new OrderDomain();
