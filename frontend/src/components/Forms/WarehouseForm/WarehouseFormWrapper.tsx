import React, { useEffect, useState } from 'react';
import WarehouseForm from './WarehouseForm';
import { warehouseDomain } from '../../../api/domains/Warehouse';
import { withRouter, RouteComponentProps } from 'react-router';
import { transformAddress } from '../../../helpers/transformAddress';

const WarehouseFormWrapper = (props: RouteComponentProps<{ id: string }>) => {
    const { path, params } = props.match
    const isEdit = path.split('/').slice(-1).pop() === 'update'
    const warehouseId = Number(params.id)
    const [warehouse, setWarehouse] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        width: "",
        length: "",
        address: "",
        city: ""
    });

    if (isEdit) {
        useEffect(() => {
            const fetchData = async () => {
                const result: any = await warehouseDomain.getOne(warehouseId);
                const address: any = transformAddress(result.data.address).split(',')
                const warehouse = {
                    ...result.data,
                    address: address[0],
                    city: address[1],
                    addressId: result.data.address.id
                }

                setWarehouse(warehouse);
            };

            fetchData();
        }, []);
    }

    const handleSubmit = async (warehouse: any) => {
        const address = { id: warehouse.addressId, address: warehouse.address, city: warehouse.city }
        warehouse.address = address
        delete warehouse.city
        delete warehouse.addressId

        isEdit ?
            await warehouseDomain.update(warehouseId, warehouse) :
            await warehouseDomain.create(warehouse)
    }

    return (
        <WarehouseForm
            onSubmit={handleSubmit}
            defaultValues={warehouse}
            isEdit={isEdit}
        />
    )
}

export default withRouter(WarehouseFormWrapper)