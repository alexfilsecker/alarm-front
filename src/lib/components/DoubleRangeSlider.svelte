<script lang="ts">
	import type { Action } from 'svelte/action';

	interface DoubleRangeSliderProps {
		start: number;
		end: number;
		max: number;
		min: number;
		step: number;
	}

	let { start = $bindable(), end = $bindable(), max, min, step }: DoubleRangeSliderProps = $props();

	let startPos = $derived((start - min) / (max - min));
	let endPos = $derived((end - min) / (max - min));

	type DragMoveEvent = CustomEvent<{ x: number }>;

	let slider: HTMLDivElement;

	const dragable: Action<HTMLDivElement, undefined, { ondragmove: (e: DragMoveEvent) => void }> = (
		node
	) => {
		let x = $state(0);

		const handleMouseDown = () => {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		};

		const handleMouseMove = (event: MouseEvent) => {
			x = event.clientX;
			node.dispatchEvent(new CustomEvent('dragmove', { detail: { x } }));
		};

		const handleMouseUp = () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};

		node.addEventListener('mousedown', handleMouseDown);
	};

	const setHandlePosition = (wich: 'start' | 'end') => {
		return (event: DragMoveEvent) => {
			const { left, right } = slider.getBoundingClientRect();
			const sliderWidth = right - left;
			const newPos = Math.min(Math.max((event.detail.x - left) / sliderWidth, 0), 1);
			let newVal = newPos * (max - min) + min;
			newVal = Math.round(newVal / step) * step;

			if (wich === 'start') {
				start = newVal;
				end = Math.max(newVal, end);
				if (end === start) {
					end += step;
					if (end >= max) {
						end = max;
						start = max - step;
					}
				}
			} else {
				end = newVal;
				start = Math.min(newVal, start);
				if (start === end) {
					start -= step;
					if (start <= min) {
						start = min;
						end = min + step;
					}
				}
			}
		};
	};
</script>

<div class="slider-container">
	<div class="slider" bind:this={slider}>
		<div
			class="body bg-primary-400"
			style="
      left: {100 * startPos}%;
      right: {100 * (1 - endPos)}%
    "
		></div>
		<div
			class="handle bg-primary-500"
			style="left: {100 * startPos}%"
			use:dragable
			ondragmove={setHandlePosition('start')}
		></div>

		<div
			class="handle bg-primary-500"
			style="left: {100 * endPos}%"
			use:dragable
			ondragmove={setHandlePosition('end')}
		></div>
	</div>
</div>

<style>
	.slider-container {
		height: 20px;
		flex-grow: 1;
		max-width: 400px;
		box-sizing: border-box;
		user-select: none;
		display: flex;
		align-items: center;
		padding: 0 10px;
	}

	.slider {
		width: 100%;
		height: 10px;
		background-color: lightgrey;
		border-radius: 5px;
		position: relative;
	}

	.body {
		top: 0;
		position: absolute;
		height: 100%;
	}

	.handle {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
