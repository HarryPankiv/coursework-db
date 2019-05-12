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
import Order from "../components/Views/Order/Order";
import OrderSingle from "../components/Views/Order/OrderSingle";
import Delivery from "../components/Views/Delivery/Delivery";
import Users from "../components/Views/Users/Users";
import Store from "../components/Views/Store/Store";

const Routes = () => (
	<BrowserRouter>
		<Header />
		<Switch>
			<Route
				path="/login"
				component={LoginForm}
			/>
			<Route
				path="/add-order"
				component={Authorize(OrderFormWrapper, [Roles.admin, Roles.storeManager])}
			/>
			<Route
				path="/item-list"
				component={Authorize(Items, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				path="/warehouse"
				component={Authorize(Warehouse, [
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
				path="/order/:id"
				component={Authorize(OrderSingle, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				path="/store"
				component={Authorize(Store, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				path="/delivery"
				component={Authorize(Delivery, [
					Roles.admin,
					Roles.storeManager,
					Roles.warehouseManager,
				])}
			/>
			<Route
				path="/users"
				component={Authorize(Users, [
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
