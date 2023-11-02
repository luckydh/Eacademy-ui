<template>
	<v-flex>
		<v-card tile flat>
			<v-img
				src="https://picsum.photos/500/300?image=15"
				lazy-src="https://picsum.photos/10/6?image=15"
				:aspect-ratio="16/9">
				<v-layout
					slot="placeholder"
					fill-height
					align-center
					justify-center
					ma-0>
					<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
				</v-layout>
				<v-layout pa-2 column fill-height class="lightbox white--text">
		          	<v-spacer></v-spacer>
		          	<v-flex shrink>
						<div class="subheading">Jonathan Lee</div>
						<div class="body-1">heyfromjonathan@gmail.com</div>
		          	</v-flex>
		        </v-layout>
			</v-img>
			<v-divider />
			<v-list dense class="mb-3">
				<template v-for="(menu, key) in nav">
					<v-list-group :key="key" v-if="menu.children && menu.children.length > 0">
						<v-subheader v-if="menu.header" slot="activator">
							{{ menu.name }}
						</v-subheader>
						<template v-for="(child, childKey) in menu.children">
							<v-list-group sub-group no-action :key="childKey" v-if="child.children && child.children.length > 0">
								<v-subheader v-if="menu.header" slot="activator">
									{{ child.name }}
								</v-subheader>
								<template v-for="(c, k) in child.children">
									<v-list-tile avatar ripple :key="k" @click="goto(c.path)">
										<v-list-tile-action><v-icon>{{ c.icon ? c.icon : 'remove' }}</v-icon></v-list-tile-action>
										<v-list-tile-content><v-list-tile-title>{{ c.name }}</v-list-tile-title></v-list-tile-content>
									</v-list-tile>
								</template>
							</v-list-group>
							<v-list-tile v-else avatar ripple :key="childKey" @click="goto(child.path)">
								<v-list-tile-action><v-icon>{{ child.icon ? child.icon : 'remove' }}</v-icon></v-list-tile-action>
								<v-list-tile-content><v-list-tile-title>{{ child.name }}</v-list-tile-title></v-list-tile-content>
							</v-list-tile>
						</template>
					</v-list-group>
					<v-list-tile avatar ripple :key="key" v-else @click="goto(menu.path)">
						<v-list-tile-action><v-icon>{{ menu.icon ? menu.icon : 'remove' }}</v-icon></v-list-tile-action>
						<v-list-tile-content><v-list-tile-title>{{ menu.name }}</v-list-tile-title></v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>
		</v-card>
	</v-flex>
</template>
<script>
	import menus from '@/modules/Menus'
	export default {
		data: () => ({
			items: [],
		}),
		computed: {
			nav() {
				return [...this.items, ...menus]
			}
		},
		methods: {
			goto(path) {
				if(path) this.$router.push({name: path})
			}
		}
	}
</script>