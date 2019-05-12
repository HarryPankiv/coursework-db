import { getRepository } from "typeorm";
import { Controller, Param, Body, Get, Post, Delete, Put } from "routing-controllers";
import { Delivery } from "../entities/Delivery";

@Controller('/delivery')
export class DeliveryController {
	@Post("/")
	create(@Body() body) {
		console.log(body);
		return getRepository(Delivery).create(body);
	}

	@Get()
	getAll() {
		return getRepository(Delivery)
			.createQueryBuilder("delivery")
			.select()
            .leftJoinAndSelect("delivery.deliveryInvoices", "deliveryInvoices")
            // .leftJoinAndSelect('')
			.orderBy('delivery.id')
			.getMany();
	}

	@Get()
	getOne() {
		return getRepository(Delivery)
			.createQueryBuilder("delivery")
			.select()
            .leftJoinAndSelect("delivery.deliveryInvoices", "deliveryInvoices")
            // .leftJoinAndSelect('')
			.orderBy('delivery.id')
			.getMany();
	}

	@Put()
	update(@Body() body: any) {
		return getRepository(Delivery)
			.createQueryBuilder("delivery")
			.update(Delivery)
    }
    
    @Delete()
    deleteDelivery(@Param("id") id: number) {
        return getRepository(Delivery)
			.createQueryBuilder("delivery")
            .delete()
            .from('delivery')
            .where("delivery.id = :id", { id })
            .execute()
    }
}