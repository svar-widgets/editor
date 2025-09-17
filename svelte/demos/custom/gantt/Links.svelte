<script>
	import { Field, Combo } from "@svar-ui/svelte-core";

	let { value = $bindable() } = $props();

	const list = [
		{ id: "e2s", label: "End-to-start" },
		{ id: "s2s", label: "Start-to-start" },
		{ id: "e2e", label: "End-to-end" },
		{ id: "s2e", label: "Start-to-end" },
	];

	function onClick(e) {
		const { action } = e.target.dataset;
		if (action) {
			// delete link here: api.exec(action, { id });
		}
	}

	function handleChange() {
		// update link here: api.exec("update-link")
	}
</script>

{#if value}
	{#each value as links}
		{#if links.data.length}
			<div class="wx-links">
				<Field label={links.title} position="top">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<table onclick={onClick}>
						{#each links.data as obj}
							<!-- svelte-ignore node_invalid_placement_ssr -->
							<tr>
								<td class="wx-cell">
									<div class="wx-task-name">
										{obj.task.text || ""}
									</div>
								</td>

								<td class="wx-cell">
									<div class="wx-wrapper">
										<Combo
											value={obj.link.type}
											placeholder={"Select link type"}
											options={list}
											onchange={e =>
												handleChange(e, obj.link.id)}
										>
											{#snippet children({ option })}
												{option.label}
											{/snippet}
										</Combo>
									</div>
								</td>

								<td class="wx-cell">
									<i
										class="wxi-delete wx-delete-icon"
										data-action="delete-link"
										data-id={obj.link.id}
									></i>
								</td>
							</tr>
						{/each}
					</table>
				</Field>
			</div>
		{/if}
	{/each}
{/if}

<style>
	.wx-links {
		margin-bottom: 10px;
	}

	.wx-cell {
		text-align: center;
	}

	.wx-task-name {
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		font-weight: var(--wx-input-font-weigth);
		color: var(--wx-input-font-color);
		width: 170px;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.wx-wrapper {
		position: relative;
		display: flex;
	}

	.wx-delete-icon {
		margin-left: 12px;
		position: relative;
		top: 2px;

		font-size: var(--wx-icon-size);
		cursor: pointer;
		color: var(--wx-gantt-icon-color);
	}

	.wx-delete-icon:hover {
		color: var(--wx-color-primary);
	}
</style>
