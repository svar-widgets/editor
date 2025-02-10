<script>
	let { option = {} } = $props();
</script>

<div class="wx-multiselect-wraper">
	<img src={option.img} alt="" class="wx-multieselectOption-img" />
	{option.label}
</div>

<style>
	.wx-multiselect-wraper {
		display: flex;
		align-items: center;
	}
	.wx-multieselectOption-img {
		width: 50px;
		height: 50px;
		margin-right: 12px;
		object-fit: cover;
		border-radius: 50px;
	}
</style>
