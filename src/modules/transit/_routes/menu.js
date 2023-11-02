let routes = [{
		name: 'Schools',
		icon: 'school',
		path: 'schools'
	}, {
		name: 'Roles & Permissions',
		icon: 'security',
		header: true,
		children: [
			{
				name: 'Roles',
				path: 'roles',
				icon: 'security',
			}, {
				name: 'Permissions',
				path: 'permissions',
				icon: 'https'
			}
		]
	}
]

export default routes;