/* src/graph/Asset.svelte generated by Svelte v3.35.0 */
import {
	SvelteComponent,
	component_subscribe,
	init,
	safe_not_equal
} from "../_snowpack/pkg/svelte/internal.js";

import { onMount } from "../_snowpack/pkg/svelte.js";

import {
	width,
	height,
	canvas as canvasStore,
	context as contextStore,
	pixelRatio,
	slice
} from "../stores.js";

function instance($$self, $$props, $$invalidate) {
	let $slice;
	component_subscribe($$self, slice, $$value => $$invalidate(1, $slice = $$value));
	let { item } = $$props;

	const repaint = context => {
		let { x, y, key } = item;
		let radius = 10;
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = "green";
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = "#003300";
		context.stroke();
		context.font = "30px serif";
		context.fillStyle = "red";
		context.fillText(key.slice(-$slice), x + 10, y + 10);
	};

	const unsubscribe = contextStore.subscribe(value => {
		value && repaint(value);
	});

	$$self.$$set = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
	};

	return [item];
}

class Asset extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, null, safe_not_equal, { item: 0 });
	}
}

export default Asset;