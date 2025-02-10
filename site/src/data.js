export function getData() {
	const users = [
		{
			id: 1,
			label: "Alice Johnson",
			name: "Alice Johnson",
			color: "#FF5387",
			initials: "AJ",
		},
		{
			id: 2,
			label: "Carol Martinez",
			name: "Carol Martinez",
			color: "#00D19A",
			initials: "CM",
		},
		{
			id: 3,
			label: "Bob Smith",
			name: "Bob Smith",
			color: "#37A9EF",
			initials: "BS",
		},
		{
			id: 4,
			label: "David Lee",
			name: "David Lee",
			color: "#8A62DF",
			initials: "DL",
		},
	];

	const priority = [
		{ id: 1, label: "High", color: "#DF282F" },
		{ id: 2, label: "Medium", color: "#FFC975" },
		{ id: 3, label: "Low", color: "#65D3B3" },
	];

	const items = [
		{
			key: "title",
			comp: "text",
			label: "Title",
			column: "left",
			required: true,
		},
		{
			key: "description",
			comp: "textarea",
			label: "Description",
			column: "left",
			required: true,
		},
		{
			comp: "select",
			label: "Priority",
			key: "priority",
			options: priority,
			column: "left",
		},
		{
			comp: "slider",
			key: "progress",
			column: "left",
			labelTemplate: value => `Progress ${value}%`,
		},
		{
			comp: "date",
			key: "start_date",
			label: "Due date",
			column: "left",
			required: true,
		},
		{
			comp: "select",
			key: "assigned",
			label: "Assigned to",
			options: users,
			column: "left",
		},
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
		},
	];

	const data = [
		{
			id: 1,
			title: "List of New Features",
			priority: 2,
			description:
				"Develop detailed wireframes for the upcoming features of the web app. This includes sketching out the user interface for new functionalities, ensuring they are consistent with the existing design language, and preparing for user feedback sessions. The wireframes should be clear and detailed, providing a solid foundation for the subsequent design and development phases.",
			start_date: new Date(2024, 7, 5),
			progress: 20,
			assigned: 1,
			comments: [
				{
					id: 1,
					user: 1,
					cardId: 1,
					content:
						"I've started sketching the initial wireframes and will share the drafts by the end of the week.",
					date: new Date(),
				},
				{
					id: 2,
					user: 2,
					cardId: 1,
					content:
						"Great, Alice! Can you ensure the new dashboard aligns with our design?",
					date: new Date(),
				},
				{
					id: 3,
					user: 1,
					cardId: 1,
					content:
						"Absolutely, I’m cross-referencing the design guide as we speak.",
					date: new Date(),
				},
				// {
				// 	id: 4,
				// 	user: 3,
				// 	cardId: 1,
				// 	content:"Make sure to leave some space for potential additional widgets. We might need to add more features later.",
				// 	date: new Date(),
				// },
			],
		},
		{
			id: 2,
			title: "Implement User Authentication",
			priority: 1,
			description:
				"Develop and integrate a secure user authentication system using OAuth 2.0. The system should support user registration, login, password recovery, and account management. Ensure it includes robust security measures to protect user data, handles various authentication scenarios, and provides a seamless user experience.",
			start_date: new Date(2024, 7, 10),
			progress: 85,
			assigned: 3,
			comments: [
				{
					id: 5,
					user: 3,
					cardId: 2,
					content:
						"I'll start by setting up the OAuth 2.0 framework and then integrate the registration and login functionality.",
					date: new Date(),
				},
				{
					id: 6,
					user: 1,
					cardId: 2,
					content:
						"Do you need any UI components for the login and registration forms?",
					date: new Date(),
				},
				{
					id: 7,
					user: 3,
					cardId: 2,
					content:
						"Yes, it would be great to have a consistent design for those.",
					date: new Date(),
				},
				// {
				// 	id:8,
				// 	user:4,
				// 	cardId: 2,
				// 	content:"For password recovery, we should consider both email and SMS options. What do you think?",
				// 	date:new Date()
				// },
				// {
				// 	id:9,
				// 	user:3,
				// 	cardId: 2,
				// 	content:"Good idea, David. I’ll plan for both. Let’s discuss the details in our next meeting.",
				// 	date:new Date()
				// }
			],
		},
		{
			id: 3,
			title: "Conduct Usability Testing",
			priority: 3,
			description:
				"Plan and execute usability testing sessions with target users to identify usability issues and gather feedback. Prepare testing scripts, recruit participants, and facilitate testing sessions. Analyze the results to uncover insights into user behavior and pain points. Provide actionable recommendations to improve the user experience based on the collected data.",
			start_date: new Date(2024, 7, 8),
			progress: 30,
			assigned: 2,
			comments: [
				{
					id: 10,
					user: 3,
					cardId: 3,
					content:
						"I've drafted the testing scripts. Please review and provide feedback.",
					date: new Date(),
				},
				{
					id: 11,
					user: 1,
					cardId: 3,
					content:
						"I’ll take a look today. Any specific areas we should focus on?",
					date: new Date(),
				},
				{
					id: 12,
					user: 3,
					cardId: 3,
					content:
						"Mainly navigation flow and form usability. We need to ensure a smooth user experience.",
					date: new Date(),
				},
				// {
				// 	id: 13,
				// 	user: 2,
				// 	cardId: 3,
				// 	content: "I've recruited participants for the testing. Sessions will be conducted over the next three days.",
				// 	date: new Date(),
				// },
				// {
				// 	id: 14,
				// 	user: 4,
				// 	cardId: 3,
				// 	content: "After the testing, let’s meet to discuss the findings and prioritize the issues.",
				// 	date: new Date(),
				// },
			],
		},
		{
			id: 4,
			title: "Optimize Database Queries",
			priority: 2,
			description:
				"Review and optimize database queries to enhance performance. This involves identifying and analyzing slow-performing queries, adding appropriate indexing, and refactoring inefficient queries. The goal is to reduce load times and improve data retrieval efficiency. Document changes and ensure that optimizations do not compromise data integrity or application functionality.",
			start_date: new Date(2024, 7, 12),
			progress: 15,
			assigned: 4,
			comments: [
				{
					id: 15,
					user: 4,
					cardId: 4,
					content:
						"I've identified a few slow queries that need immediate attention.",
					date: new Date(),
				},
				{
					id: 16,
					user: 1,
					cardId: 2,
					content:
						"David, can you share the list of queries you’re focusing on? I might have some insights.",
					date: new Date(),
				},
				{
					id: 17,
					user: 4,
					cardId: 4,
					content:
						"Sure, Bob. I’ll upload the list to our shared folder.",
					date: new Date(),
				},
				// {
				// 	id: 18,
				// 	user: 1,
				// 	cardId: 4,
				// 	content: "Once you’re done, can you also look at the queries related to the reporting module? We’ve had some delays there.",
				// 	date: new Date(),
				// },
				// {
				// 	id: 19,
				// 	user: 4,
				// 	cardId: 4,
				// 	content: "I’ll include those in my next round of optimizations. Thanks for the heads-up, Alice.",
				// 	date: new Date(),
				// },
			],
		},
	];

	return { items, data, users, priority };
}
