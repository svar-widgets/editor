export function getData() {
	const start_date = new Date("01/05/2021");
	const end_date = new Date("01/15/2021");

	const items = [
		{ comp: "text", key: "name", label: "Name", column: "left" },
		{
			comp: "textarea",
			key: "descr",
			label: "Description",
			column: "left",
		},
		{ comp: "checkbox", key: "admin", label: "Is Admin" },
		{
			comp: "select",
			key: "role",
			label: "Role",
			options: [
				{ id: "admin", label: "Admin" },
				{ id: "user", label: "User" },
			],
		},
	];

	const batchItems = [
		{
			comp: "text",
			key: "name",
			batch: "main",
			label: "Name",
		},
		{
			comp: "textarea",
			key: "descr",
			batch: "main",
			label: "Description",
		},
		{
			comp: "checkbox",
			key: "admin",
			batch: "main",
			label: "Is Admin",
		},
		{
			key: "theme",
			batch: "cfg",
			comp: "combo",
			label: "Theme",
			options: [
				{ id: "light", label: "Light" },
				{ id: "dark", label: "Dark" },
			],
		},
	];

	const values = {
		name: "John Doe",
		descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
		admin: true,
		role: "admin",
		comments: [],
		tasks: [],
	};

	const users = [
		{
			id: 1,
			name: "Sarah Smith",
		},
		{
			id: 2,
			name: "Diego Redmoor",
		},
		{
			id: 3,
			name: "Alex Johnson",
		},
		{
			id: 4,
			name: "Marta Kowalski",
		},
	];

	const listItems = [
		{
			key: "label",
			comp: "text",
			label: "Label",
		},
		{
			key: "description",
			comp: "textarea",
			label: "Description",
		},
		{
			comp: "combo",
			label: "Priority",
			key: "priority",
			options: [
				{ id: 1, label: "High" },
				{ id: 2, label: "Medium" },
				{ id: 3, label: "Low" },
			],
		},
		{
			comp: "color",
			label: "Color",
			key: "color",
		},
		{
			comp: "slider",
			key: "progress",
			label: "Progress",
		},
		{
			comp: "date",
			key: "start_date",
			label: "Start date",
		},
		{
			comp: "date",
			key: "end_date",
			label: "End date",
		},
		{
			comp: "multiselect",
			key: "users",
			label: "Users",
			options: users,
		},
		{
			comp: "hidden",
			key: "state",
		},
	];

	const listData = [
		{
			id: 1,
			label: "Integration with React",
			priority: 1,
			color: "#65D3B3",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

			start_date,
			end_date,

			progress: 25,
			users: [1, 2, 3, 4],
			sprint: "1.0",
			column: "backlog",
			type: "feature",
			comments: [
				{
					id: 1,
					user: 1,
					cardId: 1,
					content:
						"Greetings, fellow colleagues. I would like to share my insights on this task. I reckon we should deal with at least half of the points in the plan without further delays.",
					date: new Date(),
				},
				{
					id: 2,
					user: 2,
					cardId: 1,
					content:
						"Hi, Diego. I am sure that that's exactly what is thought best out there in Dunwall. Let's just do what we are supposed to do to get the result.",
					date: new Date(),
				},
				{
					id: 5,
					user: 3,
					cardId: 1,
					content:
						"Absolutely, Diego. Action speaks louder than words, and in this case, it's about executing the plan efficiently. Let's prioritize tasks and tackle them head-on.",
					date: new Date(),
				},
				{
					id: 6,
					user: 2,
					cardId: 1,
					content:
						"I couldn't agree more, Sarah. Time is of the essence, and we can't afford to waste any more of it. Let's dive into the plan and start ticking off those points one by one.",
					date: new Date(),
				},
			],
			task: [
				{
					id: 1,
					date: new Date(),
					content:
						"Research best practices for integrating third-party libraries with React",
					status: 1,
				},
				{
					id: 2,
					date: new Date(),
					content:
						"Explore modern approaches to building applications using React",
					status: 0,
				},
				{
					id: 3,
					date: new Date(),
					content:
						"Explore different methods for integrating React with existing JavaScript frameworks",
					status: 0,
				},
				{
					id: 4,
					date: new Date(),
					content: "Learn about routing in React using React Router",
					status: 1,
				},
				{
					id: 5,
					date: new Date(),
					content:
						"Understand principles and best practices for component development in React",
					status: 0,
				},
				{
					id: 6,
					date: new Date(),
					content:
						"Explore different methods for integrating React with existing JavaScript frameworks",
					status: 0,
				},
				{
					id: 7,
					date: new Date(),
					content: "Optimize performance in React applications",
					status: 0,
				},
				{
					id: 8,
					date: new Date(),
					content:
						"Work with API requests and data handling in React applications",
					status: 0,
				},
			],
			votes: [1, 3, 4],
		},
		{
			id: 2,
			label: "Archive the cards/boards ",
			priority: 2,
			color: "#FFC975",

			start_date,
			end_date,
			comments: [],
			task: [],

			sprint: "1.0",
			column: "backlog",
			type: "feature",
			users: [3, 4],
		},
		{
			id: 3,
			label: "Searching and filtering",
			priority: 1,
			color: "#65D3B3",

			start_date,

			sprint: "1.2",
			column: "backlog",
			type: "task",
			comments: [
				{
					id: 7,
					user: 4,
					cardId: 3,
					content: "Nice seven",
					date: new Date(),
				},
				{
					id: 8,
					user: 3,
					cardId: 3,
					content: "Nice eight",
					date: new Date(),
				},
				{
					id: 9,
					user: 1,
					cardId: 3,
					content: "Nice nine",
					date: new Date(),
				},
			],
			task: [
				{
					id: 1,
					date: new Date(),
					content:
						"Implement basic search functionality to filter items by keyword",
					status: 1,
				},
				{
					id: 2,
					date: new Date(),
					content:
						"Add filtering options to categorize items based on specific criteria",
					status: 0,
				},
			],
			votes: [1, 3, 4],
		},
	];

	const valuesValidation = {
		firstName: "John",
		lastName: "Doe",
		company: "Innovate company",
		contact: "+0122333456",
		email: "john.doe@example.org",
		additional:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
	};

	const itemsValidation = [
		{
			comp: "text",
			key: "firstName",
			label: "First name",
			validation: val => {
				const regEx = /^[a-zA-Z]+$/;
				return val && regEx.test(val);
			},
			validationMessage: "Incorrect name!",
		},
		{
			comp: "text",
			key: "lastName",
			label: "Last name",
			validation: val => {
				const regEx = /^[a-zA-Z]+$/;
				return val && regEx.test(val);
			},
			validationMessage: "Incorrect name!",
		},
		{
			comp: "text",
			key: "company",
			label: "Company",
			validation: val => val.length > 2,
		},
		{
			comp: "text",
			key: "contact",
			label: "Contact number",
			validation: val => {
				const regEx = /^\+?\d*$/;
				return val.length > 9 && regEx.test(val);
			},
			validationMessage: "Please, enter correct phone number",
		},
		{
			comp: "text",
			key: "email",
			label: "Email",
			validation: val => {
				//eslint-disable-next-line
				const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
				return val && regEx.test(val);
			},
			validationMessage: "Incorrect email!",
		},
		{
			comp: "textarea",
			key: "additional",
			label: "Additional information",
			validation: val => val.length >= 20 && val.length <= 160,
			validationMessage:
				"Value should have at least 20 characters and no more than 160 characters",
		},
	];

	return {
		items,
		values,
		listData,
		listItems,
		batchItems,
		users,
		valuesValidation,
		itemsValidation,
	};
}

export function sectionItems(sec = {}) {
	const data = [
		{
			comp: "text",
			key: "name",
			label: "Name",
		},
		{
			comp: "textarea",
			key: "descr",
			label: "Description",
		},
		{
			comp: "section",
			key: "comments-section",
			label: "Comments",
		},
		{
			comp: "comments",
			key: "comments",
			section: "comments-section",
		},
		{
			comp: "section",
			key: "tasks-section",
			label: "Tasks",
		},
		{
			comp: "tasks",
			key: "tasks",
			section: "tasks-section",
		},
	];

	data.forEach(item => {
		if (item.comp === "section") Object.assign(item, sec);
	});
	return data;
}

export function onlySectionItems(sec = {}) {
	const data = [
		{
			comp: "section",
			key: "personal-section",
			label: "Personal Info",
			active: true,
		},
		{
			comp: "text",
			key: "name",
			batch: "main",
			label: "Name",
			section: "personal-section",
		},
		{
			comp: "textarea",
			key: "descr",
			batch: "main",
			label: "Description",
			section: "personal-section",
		},

		// the data below is used instead of the commented lines below
		{
			comp: "section",
			key: "role-section",
			label: "Role",
		},
		{
			comp: "select",
			key: "role",
			options: [
				{ id: "admin", name: "Admin" },
				{ id: "user", name: "User" },
			],
			section: "role-section",
		},
		{
			comp: "section",
			key: "admin-section",
			label: "Is admin",
		},
		{
			comp: "checkbox",
			key: "admin",
			section: "admin-section",
		},
		{
			comp: "section",
			key: "comments-section",
			label: "Comments",
		},
		{
			comp: "comments",
			key: "comments",
			section: "comments-section",
		},
		{
			comp: "section",
			key: "tasks-section",
			label: "Tasks",
		},
		{
			comp: "tasks",
			key: "tasks",
			section: "tasks-section",
		},
	];

	data.forEach(item => {
		if (item.comp === "section") Object.assign(item, sec);
	});
	return data;
}
