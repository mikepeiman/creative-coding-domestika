<script>
	export let label = '';
</script>

<div class='param'>
	{#if label}<label>{label}</label>{/if}
	<div class='param-wrapper'>
		<slot class='test'></slot>
	</div>
</div>

<style>
	.param {
		/* margin-top: 20px; */
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
	div:first-child {
		margin-top: 0;
	}
	.param-wrapper {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-shrink: 1;
		flex-grow: 1;
		flex-basis: 60%;
		box-sizing: border-box;
	}
	label {
		font-size: 12px;
		flex-shrink: 1;
		flex-grow: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: black;
		padding-right: 10px;
		flex-basis: 40%;
		box-sizing: border-box;
	}
</style>