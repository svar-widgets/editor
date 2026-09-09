import { push } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import { links as raw } from "../routes";

const routes = {
	"/": wrap({
		component: {},
		conditions: () => {
			void push("/base/willow");
			return false;
		},
	}),
};

const flatLinks = raw.flatMap(g => g.items);

function getRoutes(skinSettings, cb) {
	flatLinks.forEach(
		a =>
			(routes[a[0]] = wrap({
				component: a[2],
				userData: a,
				props: { ...skinSettings },
				conditions: x => {
					cb(x.location);
					return true;
				},
			}))
	);

	return routes;
}

function getLinks() {
	return raw;
}

function getFlatLinks() {
	return flatLinks;
}

export { push, getRoutes, getLinks, getFlatLinks };
