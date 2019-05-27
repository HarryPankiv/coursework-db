import React, { PureComponent } from 'react';
import WarehouseForm from './WarehouseForm';
import { warehouseDomain } from '../../../api/domains/Warehouse';

type Prop = {}

type State = Readonly<{

}>

class WarehouseFormWrapper extends PureComponent<Prop, State> {

    readonly state: State = {

    }

    handleSubmit = async (warehouse: any) => {
        await warehouseDomain.create(warehouse)
    }

    render() {
        return (
            <WarehouseForm
                onSubmit={this.handleSubmit}
            />
        )
    }

}

export default WarehouseFormWrapper