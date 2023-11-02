<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>
					<v-card-title class="title">
						School Information
					</v-card-title>
					<v-card-text>
						<v-form ref="form">
							<v-layout row wrap>
								<v-flex xs12 sm4>
									<v-text-field label="Name*" required />
								</v-flex>
								<v-flex xs12 sm4>
									<v-text-field label="Short Code*" required />
								</v-flex>
								<v-flex xs12 sm4>
									<v-text-field label="Domain*" required />
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Slogan*" required />
								</v-flex>
								<v-flex xs12>
									<wysiwyg />
								</v-flex>
							</v-layout>
						</v-form>
					</v-card-text>
					<v-card-actions class="pr-3">
						<v-spacer />
						<v-btn outline color="warning">Cancel</v-btn>
						<v-btn outline color="success">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {}
</script>