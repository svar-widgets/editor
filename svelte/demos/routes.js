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
// import Gantt from "./cases/Gantt.svelte";
// import Kanban from "./cases/Kanban.svelte";
// import Scheduler from "./cases/Scheduler.svelte";

export const links = [
	["/base/:skin", "Basic Form", BasicInit],
	["/modal/:skin", "Modal Editor", ModalPanel],
	["/columns/:skin", "Modal Editor with columns", ModalColumns],
	["/sidebar/:skin", "Sidebar Editor", SidebarPanel],
	["/changes-auto/:skin", "Changes: auto mode", ChangesAuto],
	["/changes-confirmed/:skin", "Changes: confirmation", ChangesConfirmed],
	["/batches/:skin", "Batches", Batches],
	["/subpanels/:skin", "Sub panels", SubPanels],
	["/actions/:skin", "Action menu", ActionMenu],
	["/buttons/:skin", "Custom buttons", CustomButtons],
	["/comments/:skin", "Comments", Comments],
	["/taslkist/:skin", "Tasklist", Tasklist],
	["/layouts/:skin", "Layouts", Layouts],
	["/backend-complex/:skin", "Separate backends", BackendComplex],
	["/combos/:skin", "Multiple combos", MultipleCombos],
	["/overflow/:skin", "Overflow", Overflow],
	["/toolbar/:skin", "Toolbar values", ToolbarValues],
	["/required/:skin", "Required fields", RequiredFields],
	["/validation/:skin", "Validation", Validation],
	["/validation-save/:skin", "Save validated values", SaveValidatedValues],
	["/locales/:skin", "Locales", Locales],
	// ["/gantt/:skin", "Gantt", Gantt],
	// ["/kanban/:skin", "Kanban", Kanban],
	// ["/scheduler/:skin", "Scheduler", Scheduler],
];
