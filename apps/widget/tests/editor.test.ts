import { describe, test, expect } from "vite-plus/test";
import { itemsToEditors } from "../src/helpers/editor.js";
import type { IItemConfig, THelper, TValues } from "../src/types.js";

const _: THelper = key => key;

const multiItems: IItemConfig[] = [
	{ comp: "text", key: "title" },
	{
		comp: "event-dates",
		key: "dates",
		keys: ["start", "end", "isFullDay"],
	},
];

const rawEvent = (): TValues => ({
	title: "Meeting",
	start: new Date(2026, 5, 10, 9),
	end: new Date(2026, 5, 10, 10),
	isFullDay: false,
});

describe("itemsToEditors, single-key items", () => {
	test("getValues / setValues use plain keys", () => {
		const editors = itemsToEditors([{ comp: "text", key: "title" }]);
		expect(editors.getValues({ title: "A", extra: 1 })).toEqual({
			title: "A",
		});

		const out = editors.setValues({}, { title: "B" }, ["title"]);
		expect(out).toEqual({ title: "B" });
	});

	test("diff ignores undefined -> empty transitions", () => {
		const editors = itemsToEditors([{ comp: "text", key: "title" }]);
		expect(editors.diff({}, { title: "" })).toEqual([]);
		expect(editors.diff({}, { title: "A" })).toEqual(["title"]);
		expect(editors.diff({ title: "A" }, { title: "A" })).toEqual([]);
	});

	test("validation works for dot-path keys", () => {
		const editors = itemsToEditors([
			{ comp: "text", key: "info.name", required: true },
		]);
		expect(
			editors.validateValues({ info: { name: "" } }, undefined, _)
		).toEqual({
			"info.name": { errorType: "required" },
		});
		expect(
			editors.validateValues({ info: { name: "ok" } }, undefined, _)
		).toBeNull();
	});
});

describe("itemsToEditors, multi-key items", () => {
	test("default getter packs sub-keys into a composite", () => {
		const editors = itemsToEditors(multiItems);
		const raw = rawEvent();

		expect(editors.getValues(raw)).toEqual({
			title: "Meeting",
			dates: {
				start: raw.start,
				end: raw.end,
				isFullDay: false,
			},
		});
	});

	test("default getter supports dot-path sub-keys", () => {
		const editors = itemsToEditors([
			{ comp: "x", key: "when", keys: ["time.start", "time.end"] },
		]);
		const raw = { time: { start: 1, end: 2 } };

		expect(editors.getValues(raw)).toEqual({
			when: { "time.start": 1, "time.end": 2 },
		});

		const out = editors.setValues(
			{ time: { start: 0, end: 0 } },
			{ when: { "time.start": 3, "time.end": 4 } },
			["when"]
		);
		expect(out).toEqual({ time: { start: 3, end: 4 } });
	});

	test("default setter unpacks the composite into raw fields", () => {
		const editors = itemsToEditors(multiItems);
		const raw = rawEvent();
		const next = new Date(2026, 5, 11, 9);

		editors.setValues(
			raw,
			{ dates: { start: next, end: raw.end, isFullDay: true } },
			["dates"]
		);
		expect(raw.start).toBe(next);
		expect(raw.isFullDay).toBe(true);
	});

	test("setValues resolves sub-keys and mixed lists to one editor", () => {
		const editors = itemsToEditors(multiItems);
		const raw = rawEvent();
		const data = {
			title: "Meeting",
			dates: { start: raw.start, end: raw.end, isFullDay: true },
		};

		// sub-key + editor key + unknown key resolve without duplicates/crash
		editors.setValues(raw, data, ["isFullDay", "dates", "unknown"]);
		expect(raw.isFullDay).toBe(true);
		expect(raw.title).toBe("Meeting");
	});

	test("diff reports real field keys", () => {
		const editors = itemsToEditors(multiItems);
		const raw = rawEvent();

		const data = editors.getValues(raw);
		expect(editors.diff(raw, data)).toEqual([]);

		data.dates = {
			...data.dates,
			end: new Date(2026, 5, 10, 12),
			isFullDay: true,
		};
		expect(editors.diff(raw, data)).toEqual(["end", "isFullDay"]);
	});

	test("diff ignores undefined -> empty transitions per member", () => {
		const editors = itemsToEditors(multiItems);
		const raw = { title: "A" };

		expect(
			editors.diff(raw, {
				title: "A",
				dates: { start: undefined, end: "", isFullDay: false },
			})
		).toEqual([]);
		expect(
			editors.diff(raw, {
				title: "A",
				dates: { start: undefined, end: "", isFullDay: true },
			})
		).toEqual(["isFullDay"]);
	});

	test("cross-field validation receives the composite, error keyed by item", () => {
		const editors = itemsToEditors([
			{
				comp: "x",
				key: "dates",
				keys: ["start", "end"],
				validation: (v: any) => !v.start || !v.end || v.end >= v.start,
			},
		]);

		expect(editors.validateValues({ start: 2, end: 1 }, undefined, _)).toEqual({
			dates: { errorType: "validation" },
		});
		expect(
			editors.validateValues({ start: 1, end: 2 }, undefined, _)
		).toBeNull();
		// sub-key change lists resolve to the owning editor
		expect(editors.validateValues({ start: 2, end: 1 }, ["end"], _)).toEqual({
			dates: { errorType: "validation" },
		});
	});

	test("required means every sub-field is truthy", () => {
		const editors = itemsToEditors([
			{
				comp: "x",
				key: "dates",
				keys: ["start", "end", "isFullDay"],
				required: true,
			},
		]);

		expect(editors.validateValues({ start: 1, end: 2 }, undefined, _)).toEqual({
			dates: { errorType: "required" },
		});
		// falsy sub-values fail, same as single-field required
		expect(
			editors.validateValues(
				{ start: 1, end: 2, isFullDay: false },
				undefined,
				_
			)
		).toEqual({
			dates: { errorType: "required" },
		});
		expect(
			editors.validateValues(
				{ start: 1, end: 2, isFullDay: true },
				undefined,
				_
			)
		).toBeNull();
	});

	test("custom getter/setter win over generated composites", () => {
		const editors = itemsToEditors([
			{
				comp: "x",
				key: "dates",
				keys: ["start", "end"],
				getter: (obj: any) => ({ start: obj.s, end: obj.e }),
				setter: (obj: any, v: any) => {
					obj.s = v.start;
					obj.e = v.end;
				},
			},
		]);

		expect(editors.getValues({ s: 1, e: 2 })).toEqual({
			dates: { start: 1, end: 2 },
		});
		const out = editors.setValues(
			{ s: 1, e: 2 },
			{ dates: { start: 3, end: 4 } },
			["start"]
		);
		expect(out).toEqual({ s: 3, e: 4 });
	});
});
