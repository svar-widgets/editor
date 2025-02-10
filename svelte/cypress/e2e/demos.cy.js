const cases = [
	"/base/:skin",
	"/base/:skin",
	"/modal/:skin",
	"/columns/:skin",
	"/sidebar/:skin",
	"/changes-auto/:skin",
	"/changes-confirmed/:skin",
	"/subpanels/:skin",
	"/batches/:skin",
	"/actions/:skin",
	"/buttons/:skin",
	"/comments/:skin",
	"/taslkist/:skin",
];

const skins = ["material", "willow", "willow-dark"];
const links = [];

cases.forEach(w => {
	skins.forEach(s => {
		links.push(w.replace(":skin", s));
	});
});

context("Basic functionality", () => {
	it("widget", () => {
		links.forEach(w => {
			cy.visit(`/index.html#${w}`);
			cy.shot(w, { area: ".content" });
		});
	});
});
