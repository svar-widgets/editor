import type { Component, Snippet } from "svelte";

/** Identifier used for fields, items and toolbar entries. */
export type TID = string | number;

/** A bag of editor values keyed by field name. */
export type TValues = Record<string, any>;

/** Validation errors keyed by field name, or `null` when everything is valid. */
export type TErrors = Record<string, { errorType: string }> | null;

/** Translation helper returned by the `wx-i18n` context group. */
export type THelper = (key: string, ...params: any[]) => string;

/** Shape of the `wx-i18n` context provided by `Locale`. */
export interface IWxI18n {
	getGroup(name: string): THelper;
	getRaw(): unknown;
}

/**
 * A single field/control configuration as supplied by the user in `items`.
 * Extra, control-specific props (placeholder, options, ...) are passed through
 * to the underlying component, hence the index signature.
 */
export interface IItemConfig {
	comp?: string;
	key?: TID;
	// multi-field item: the comp receives/emits a composite object keyed by
	// these field names, while diff/changes report the real field keys
	keys?: TID[];
	id?: TID;
	label?: string;
	// "left" places the field in the left column (columns layout); any other value → right
	column?: string;
	batch?: string;
	section?: string;
	sectionMode?: "exclusive" | "accordion";
	activeSection?: boolean;
	hidden?: boolean;
	required?: boolean;
	validation?: (value: any) => boolean;
	validationMessage?: string;
	labelTemplate?: (value: any) => string;
	options?: any[];
	config?: Record<string, any>;
	getter?: (obj: any) => any;
	setter?: (obj: any, value: any) => void;
	css?: string;
	type?: string;
	text?: string;
	icon?: string;
	[key: string]: any;
}

/** Normalized editor field — `itemsToEditors` guarantees key/getter/setter. */
export interface IEditor extends IItemConfig {
	key: TID;
	getter: (obj: any) => any;
	setter: (obj: any, value: any) => void;
}

/** Result of `itemsToEditors`: normalized config plus value helpers. */
export interface IEditorsConfig {
	config: IEditor[];
	getValues(raw: TValues): TValues;
	setValues(out: TValues, values: TValues, changes: TID[]): TValues;
	diff(raw: TValues, values: TValues): TID[];
	validateValues(
		values: TValues,
		changes: TID[] | undefined,
		_: THelper
	): TErrors;
}

/** Toolbar button descriptor produced by the helpers in `buttons.ts`. */
export interface IButton {
	comp: string;
	id?: string;
	text?: string;
	icon?: string;
	type?: string;
}

/** Top/bottom bar configuration, or `false`/`true` to hide/auto-fill it. */
export interface IBarConfig {
	// bar entries are arbitrary toolbar-widget item configs, not just IButtons
	items?: any[];
	layout?: "row" | "column";
	[key: string]: any;
}
export type TBar = boolean | IBarConfig;

/** Hotkey map (or `false` to disable the default hotkeys). */
export type THotkeys = false | Record<string, (event?: KeyboardEvent) => void>;

/** Payload emitted when a field value changes. */
export interface IFieldChange {
	key: TID;
	value: any;
	input?: boolean;
	update?: TValues;
}

/** Payload of toolbar/section action events. */
export interface IActionEvent {
	item: any;
}

/**
 * A single attached-file descriptor stored in the editor value.
 * Holds metadata only — the raw binary never enters the stored value.
 */
export interface IUploadedFile {
	id: TID;
	name: string;
	url?: string;
	size?: number;
	// "client" while uploading, "error" on failure; absent once stored
	status?: "client" | "server" | "error";
	// raw File, present only on in-flight upload objects
	file?: File;
	[key: string]: any;
}

/** Files item value: inline array of files or a master record id for `ondata`. */
export type TFilesValue = IUploadedFile[] | TID;

/** Upload target: REST endpoint string or custom uploader function. */
export type TUploadURL =
	| string
	| ((file: IUploadedFile) => Promise<Record<string, any>>);

/** Payload emitted by the files item on add/delete. */
export interface IFilesChangeEvent {
	value: IUploadedFile[];
	action: "add" | "delete";
	file: IUploadedFile;
	originalValue?: TFilesValue;
}

export type TChangeHandler = (ev: IFieldChange) => void;
export type TActionHandler = (ev: IActionEvent) => void;
export type TFilesChangeHandler = (ev: IFilesChangeEvent) => void;
export type TFilesActionHandler = (ev: {
	action: "add-file" | "delete-file";
	file: IUploadedFile;
	value: IUploadedFile[];
}) => void;
export type TSaveHandler = (ev: { changes: TID[]; values: TValues }) => void;
export type TValidationHandler = (ev: {
	errors: TErrors;
	values: TValues;
}) => void;
export type TActionResultHandler = (ev: {
	item: any;
	values: TValues;
	changes: TID[];
}) => void;

/** View component (Layout / FormEditor) rendered by `Values`. */
export type TView = Component<any>;
export type { Snippet };
