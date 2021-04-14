/* src/graph/Canvas.svelte generated by Svelte v3.35.0 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	component_subscribe,
	create_slot,
	detach,
	element,
	globals,
	init,
	insert,
	listen,
	safe_not_equal,
	set_style,
	space,
	transition_in,
	transition_out,
	update_slot
} from "../_snowpack/pkg/svelte/internal.js";

const { window: window_1 } = globals;
import { onMount } from "../_snowpack/pkg/svelte.js";

import {
	width,
	height,
	canvas as canvasStore,
	context as contextStore,
	pixelRatio
} from "../stores.js";

function create_fragment(ctx) {
	let div;
	let canvas_1;
	let canvas_1_width_value;
	let canvas_1_height_value;
	let t;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

	return {
		c() {
			div = element("div");
			canvas_1 = element("canvas");
			t = space();
			if (default_slot) default_slot.c();
			attr(canvas_1, "width", canvas_1_width_value = /*$width*/ ctx[1] * /*$pixelRatio*/ ctx[2]);
			attr(canvas_1, "height", canvas_1_height_value = /*$height*/ ctx[3] * /*$pixelRatio*/ ctx[2]);
			set_style(canvas_1, "width", /*$width*/ ctx[1] + "px");
			set_style(canvas_1, "height", /*$height*/ ctx[3] + "px");
			attr(div, "class", "overflow-auto h-64");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, canvas_1);
			/*canvas_1_binding*/ ctx[8](canvas_1);
			insert(target, t, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;

			if (!mounted) {
				dispose = listen(window_1, "resize", /*handleResize*/ ctx[4], { passive: true });
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*$width, $pixelRatio*/ 6 && canvas_1_width_value !== (canvas_1_width_value = /*$width*/ ctx[1] * /*$pixelRatio*/ ctx[2])) {
				attr(canvas_1, "width", canvas_1_width_value);
			}

			if (!current || dirty & /*$height, $pixelRatio*/ 12 && canvas_1_height_value !== (canvas_1_height_value = /*$height*/ ctx[3] * /*$pixelRatio*/ ctx[2])) {
				attr(canvas_1, "height", canvas_1_height_value);
			}

			if (!current || dirty & /*$width*/ 2) {
				set_style(canvas_1, "width", /*$width*/ ctx[1] + "px");
			}

			if (!current || dirty & /*$height*/ 8) {
				set_style(canvas_1, "height", /*$height*/ ctx[3] + "px");
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 64) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			/*canvas_1_binding*/ ctx[8](null);
			if (detaching) detach(t);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $width;
	let $pixelRatio;
	let $height;
	component_subscribe($$self, width, $$value => $$invalidate(1, $width = $$value));
	component_subscribe($$self, pixelRatio, $$value => $$invalidate(2, $pixelRatio = $$value));
	component_subscribe($$self, height, $$value => $$invalidate(3, $height = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	let { attributes = {} } = $$props;
	let canvas;
	let frame;
	let context;

	onMount(() => {
		// prepare canvas stores
		context = canvas.getContext("2d", attributes);

		canvasStore.set(canvas);
		contextStore.set(context);
		return; // createLoop ()
	});

	function handleResize() {
		width.set(window.innerWidth);
		height.set(window.innerHeight);
		pixelRatio.set(window.devicePixelRatio);
	}

	function createLoop(fn) {
		let elapsed = 0;
		let lastTime = performance.now();

		(function loop() {
			frame = requestAnimationFrame(loop);
			const beginTime = performance.now();
			const dt = (beginTime - lastTime) / 1000;
			lastTime = beginTime;
			elapsed += dt;
			fn(elapsed, dt);
		})();

		return () => {
			cancelAnimationFrame(frame);
		};
	}

	function canvas_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			canvas = $$value;
			$$invalidate(0, canvas);
		});
	}

	$$self.$$set = $$props => {
		if ("attributes" in $$props) $$invalidate(5, attributes = $$props.attributes);
		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
	};

	return [
		canvas,
		$width,
		$pixelRatio,
		$height,
		handleResize,
		attributes,
		$$scope,
		slots,
		canvas_1_binding
	];
}

class Canvas extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { attributes: 5 });
	}
}

export default Canvas;