import * as React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import { Authorize } from "./Authorize";
import { Roles } from "../types/roles";

import LoginForm from "../components/Forms/LoginForm/LoginForm";
import OrderFormWrapper from "../components/Forms/OrderForm/OrderFormWrapper";

import Home from "../components/Home/Home";
import Header from "../components/Header/Header";

import Items from "../components/Views/Items/Items";
import Warehouse from "../components/Views/Warehouse/Warehouse";
import WarehouseSingle from "../components/Views/Warehouse/WarehouseSingle";
import Order from "../components/Views/Order/Order";
import OrderSingle from "../components/Views/Order/OrderSingle";
import Delivery from "../components/Views/Delivery/Delivery";
import Users from "../components/Views/Users/Users";
import Store from "../components/Views/Store/Store";
import ItemsFormWrapper from "../components/Forms/ItemsForm/ItemFormWrapper";
import WarehouseFormWrapper from "../components/Forms/WarehouseForm/WarehouseFormWrapper";
import StoreFormWrapper from "../components/Forms/StoreForm/StoreFormWrapper";
import DeliveryFormWrapper from "../components/Forms/DeliveryForm/DeliveryFormWrapper";
import UsersFormWrapper from "../components/Forms/UsersForm/UsersFormWrapper";

const Routes = () => (
	<BrowserRouter>
		<Header />
		<Switch>
			<Route
				path="/login"
				component={LoginForm}
			/>
			<Route
				exact
				path="/items"
				component={Authorize(Items, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/items/new"
				component={Authorize(ItemsFormWrapper, [
					Roles.admin,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/warehouse"
				component={Authorize(Warehouse, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/warehouse/new"
				component={Authorize(WarehouseFormWrapper, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				path="/warehouse/:id"
				component={Authorize(WarehouseSingle, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/order"
				component={Authorize(Order, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/order/new"
				component={Authorize(OrderFormWrapper, [
					Roles.admin,
					Roles.storeManager
				])}
			/>
			<Route
				path="/order/:id"
				component={Authorize(OrderSingle, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/store"
				component={Authorize(Store, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/store/new"
				component={Authorize(StoreFormWrapper, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/delivery"
				component={Authorize(Delivery, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/delivery/new"
				component={Authorize(DeliveryFormWrapper, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/users"
				component={Authorize(Users, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				exact
				path="/users/new"
				component={Authorize(UsersFormWrapper, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				path="/"
				component={Authorize(Home, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
					Roles.storeWorker,
				])}
			/>
		</Switch>
	</BrowserRouter>
);

export default Routes;
