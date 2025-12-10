import BasicInit from "./cases/BasicInit.svelte";
import ModalPanel from "./cases/ModalPanel.svelte";
import ModalColumns from "./cases/ModalColumns.svelte";
import SidebarPanel from "./cases/SidebarPanel.svelte";
import Batches from "./cases/Batches.svelte";
import SubPanels from "./cases/SubPanels.svelte";
import ChangesAuto from "./cases/ChangesAuto.svelte";
import ChangesConfirmed from "./cases/ChangesConfirmed.svelte";
import CustomButtons from "./cases/CustomButtons.svelte";
import ActionMenu from "./cases/ActionMenu.svelte";
import ToolbarValues from "./cases/ToolbarValues.svelte";
import Tasklist from "./cases/Tasklist.svelte";
import Comments from "./cases/Comments.svelte";
import Layouts from "./cases/Layouts.svelte";
import BackendComplex from "./cases/BackendComplex.svelte";
import MultipleCombos from "./cases/MultipleCombos.svelte";
import Overflow from "./cases/Overflow.svelte";
import SaveValidatedValues from "./cases/SaveValidatedValues.svelte";
import Validation from "./cases/Validation.svelte";
import RequiredFields from "./cases/RequiredFields.svelte";
import Locales from "./cases/Locales.svelte";
import Overlay from "./cases/Overlay.svelte";
// import Gantt from "./cases/Gantt.svelte";
// import Kanban from "./cases/Kanban.svelte";
// import Scheduler from "./cases/Scheduler.svelte";

export const links = [
	["/base/:skin", "Basic Form", BasicInit, "BasicInit"],
	["/modal/:skin", "Modal Editor", ModalPanel, "ModalPanel"],
	[
		"/columns/:skin",
		"Modal Editor with columns",
		ModalColumns,
		"ModalColumns",
	],
	["/sidebar/:skin", "Sidebar Editor", SidebarPanel, "SidebarPanel"],
	["/changes-auto/:skin", "Changes: auto mode", ChangesAuto, "ChangesAuto"],
	[
		"/changes-confirmed/:skin",
		"Changes: confirmation",
		ChangesConfirmed,
		"ChangesConfirmed",
	],
	["/batches/:skin", "Batches", Batches, "Batches"],
	["/subpanels/:skin", "Sub panels", SubPanels, "SubPanels"],
	["/actions/:skin", "Action menu", ActionMenu, "ActionMenu"],
	["/buttons/:skin", "Custom buttons", CustomButtons, "CustomButtons"],
	["/comments/:skin", "Comments", Comments, "Comments"],
	["/taslkist/:skin", "Tasklist", Tasklist, "Tasklist"],
	["/layouts/:skin", "Layouts", Layouts, "Layouts"],
	[
		"/backend-complex/:skin",
		"Separate backends",
		BackendComplex,
		"BackendComplex",
	],
	["/combos/:skin", "Multiple combos", MultipleCombos, "MultipleCombos"],
	["/overflow/:skin", "Overflow", Overflow, "Overflow"],
	["/toolbar/:skin", "Toolbar values", ToolbarValues, "ToolbarValues"],
	["/required/:skin", "Required fields", RequiredFields, "RequiredFields"],
	["/validation/:skin", "Validation", Validation, "Validation"],
	[
		"/validation-save/:skin",
		"Save validated values",
		SaveValidatedValues,
		"SaveValidatedValues",
	],
	["/locales/:skin", "Locales", Locales, "Locales"],
	["/overlay/:skin", "Overlay", Overlay, "Overlay"],
	// ["/gantt/:skin", "Gantt", Gantt, "Gantt"],
	// ["/kanban/:skin", "Kanban", Kanban, "Kanban"],
	// ["/scheduler/:skin", "Scheduler", Scheduler, "Scheduler"],
];
