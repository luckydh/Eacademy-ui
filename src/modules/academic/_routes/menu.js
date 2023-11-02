let routes = [{
	name: 'Academic',
	icon: 'university',
	header: true,
	children: [{
			name: 'Grades',
			path: 'grades',
			icon: 'layers'
		}, {
			name: 'Batches',
			path: 'batches',
			icon: 'insert_invitation'
		}, {
			name: 'Subjects',
			path: 'subjects',
			icon: 'book'
		}, {
			name: 'Settings',
			path: '',
			children: [
				{
					name: 'Menu 1',
					path: ''
				}
			]
		}
	]
}]

export default routes;