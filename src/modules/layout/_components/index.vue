<template>
	<v-app>
		<v-navigation-drawer persistent v-model="drawer" fixed clipped class="grey lighten-4" app>
			<side-bar />
		</v-navigation-drawer>
		<v-toolbar dark color="blue darken-3" dense app fixed :clipped-left="$vuetify.breakpoint.mdAndUp">
			<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
			<span class="title ml-3 mr-5">eAcademy&nbsp;<span class="font-weight-light">Nepal</span></span>
			<!-- <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field> -->
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-menu offset-y transition="slide-y-reverse-transition">
					<v-btn flat slot="activator">{{ batch.name }} <v-icon ml-2>arrow_drop_down</v-icon></v-btn>
					<v-list>
						<v-subheader>Select Batch</v-subheader>
						<v-list-tile v-for="(item, index) in batches" :key="index" @click="selectBatch(item.id)" v-if="item.id != batch.id">
							<v-list-tile-title>{{ item.name }}</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
				<v-menu offset-y transition="slide-y-reverse-transition">
					<v-btn icon slot="activator">
						<v-badge overlap color="red">
							<span slot="badge">6</span>
							<v-icon>cake</v-icon>
						</v-badge>
					</v-btn>
					<v-card style="width: 260px;">
						<v-card-text>
							Hello Menu
						</v-card-text>
					</v-card>
				</v-menu>
				<v-menu offset-y transition="slide-y-reverse-transition">
					<v-btn icon slot="activator">
						<v-badge overlap color="red">
							<span slot="badge">6</span>
							<v-icon>sms</v-icon>
						</v-badge>
					</v-btn>
					<v-card style="width: 260px;">
						<v-card-text>
							Hello Menu
						</v-card-text>
					</v-card>
				</v-menu>
				<v-menu offset-y transition="slide-y-reverse-transition">
					<v-btn icon slot="activator">
						<v-badge overlap color="red">
							<span slot="badge">6</span>
							<v-icon>notifications</v-icon>
						</v-badge>
					</v-btn>
					<v-card style="width: 260px;">
						<v-card-text>
							Hello Menu
						</v-card-text>
					</v-card>
				</v-menu>
				<v-menu offset-y transition="slide-y-reverse-transition">
					<v-btn icon slot="activator">
						<v-icon>more_vert</v-icon>
					</v-btn>
					<v-card style="width: 240px;">
						<v-list>
							<v-subheader>Profile & Settings</v-subheader>
							<v-list-tile @click="">
								<v-list-tile-action><v-icon>account_circle</v-icon></v-list-tile-action>
								<v-list-tile-title>Profile Setting</v-list-tile-title>
							</v-list-tile>
							<v-list-tile @click="logout">
								<v-list-tile-action><v-icon>input</v-icon></v-list-tile-action>
								<v-list-tile-title>Log Out</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-card>
				</v-menu>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<v-container fluid fill-height class="grey lighten-4 pa-3">
				<v-layout>
					<transition name="router-anim">
						<router-view :key="$route.fullPath" />
					</transition>
				</v-layout>
			</v-container>
		</v-content>
		<v-snackbar v-model="snackbar.show" :color="snackbar.status" :right="true" :top="true">
			{{ snackbar.message }}
		</v-snackbar>
	</v-app>
</template>
<style lang="scss" scoped>
	.v-badge--overlap .v-badge__badge {
		display: none;
	}
	.notification {
		.v-badge__badge {
			display: none;
		}
	}
</style>
<script>
	import cookie from 'js-cookie'
	import { mapState, mapActions } from 'vuex'
	import SideBar from '@/components/SideBar'
	export default {
		components: {
			SideBar
		},
		data: () => ({
			drawer: true,
			snackbar: {},
			batches: []
		}),
		mounted() {
			this.$events.listen('notification', payload => {
				if(typeof payload == 'object' && payload.message) {
					this.snackbar = {
						message: payload.message ? payload.message : '',
						status: payload.status ? payload.status : 'success',
						show: true
					}
				}
			})
			this.getBatches();
		},

		computed: {
			...mapState(['batch']),
		},

		methods: {
			...mapActions(['setBatch']),

			logout() {
				this.$storage.delete('account');
				this.$storage.delete('user');
				cookie.remove('_token');
				this.$router.replace({name: 'login'})
			},

			getBatches() {
				this.$rest.get('/api/batch').then(({data}) => {
					this.batches = data.data.map(item => {
						return { id: item.id, name: item.name };
					})
					let b = this.$storage.get('batch');
					if(b) {
						this.setBatch(JSON.parse(b));
					} else this.setBatch(this.batches[this.batches.length - 1]);
				})
			},

			selectBatch(id) {
				let b = this.batches.find(item => item.id == id);
				this.$storage.set('batch', JSON.stringify(b));
				this.setBatch(b);
			}
		}
	}
</script>