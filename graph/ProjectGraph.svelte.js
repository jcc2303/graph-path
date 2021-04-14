/* src/graph/ProjectGraph.svelte generated by Svelte v3.35.0 */
import {
	SvelteComponent,
	add_flush_callback,
	append,
	attr,
	bind,
	binding_callbacks,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	noop,
	safe_not_equal,
	space,
	text,
	transition_in,
	transition_out
} from "../_snowpack/pkg/svelte/internal.js";

import { onMount } from "../_snowpack/pkg/svelte.js";
import { project, start, slice } from "../stores.js";
import Canvas from "./Canvas.svelte.js";
import GraphPath from "./GraphPath.svelte.js";
import AssetsGraph from "./AssetsGraph.svelte.js";
import Asset from "./Asset.svelte.js";
import Connection from "./Connection.svelte.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

// (66:2) {#each connections as item}
function create_each_block_1(ctx) {
	let connection;
	let current;
	connection = new Connection({ props: { item: /*item*/ ctx[13] } });

	return {
		c() {
			create_component(connection.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connection, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(connection.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connection.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connection, detaching);
		}
	};
}

// (69:2) {#each assets as item}
function create_each_block(ctx) {
	let asset;
	let current;
	asset = new Asset({ props: { item: /*item*/ ctx[13] } });

	return {
		c() {
			create_component(asset.$$.fragment);
		},
		m(target, anchor) {
			mount_component(asset, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(asset.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(asset.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(asset, detaching);
		}
	};
}

// (65:0) <Canvas>
function create_default_slot(ctx) {
	let t;
	let each1_anchor;
	let current;
	let each_value_1 = /*connections*/ ctx[4];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
		each_blocks_1[i] = null;
	});

	let each_value = /*assets*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(target, anchor);
			}

			insert(target, t, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*connections*/ 16) {
				each_value_1 = /*connections*/ ctx[4];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
						transition_in(each_blocks_1[i], 1);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						transition_in(each_blocks_1[i], 1);
						each_blocks_1[i].m(t.parentNode, t);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (dirty & /*assets*/ 8) {
				each_value = /*assets*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out_1(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks_1[i]);
			}

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks_1 = each_blocks_1.filter(Boolean);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks_1, detaching);
			if (detaching) detach(t);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each1_anchor);
		}
	};
}

function create_fragment(ctx) {
	let canvas;
	let t0;
	let input;
	let t1;
	let div2;
	let div0;
	let assetsgraph;
	let updating_graph;
	let t2;
	let div1;
	let graphpath;
	let current;
	let mounted;
	let dispose;

	canvas = new Canvas({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	function assetsgraph_graph_binding(value) {
		/*assetsgraph_graph_binding*/ ctx[6](value);
	}

	let assetsgraph_props = { project: /*$project*/ ctx[1] };

	if (/*graph*/ ctx[0] !== void 0) {
		assetsgraph_props.graph = /*graph*/ ctx[0];
	}

	assetsgraph = new AssetsGraph({ props: assetsgraph_props });
	binding_callbacks.push(() => bind(assetsgraph, "graph", assetsgraph_graph_binding));
	graphpath = new GraphPath({ props: { graph: /*graph*/ ctx[0] } });

	return {
		c() {
			create_component(canvas.$$.fragment);
			t0 = text("\nlength id:\n");
			input = element("input");
			t1 = space();
			div2 = element("div");
			div0 = element("div");
			create_component(assetsgraph.$$.fragment);
			t2 = space();
			div1 = element("div");
			create_component(graphpath.$$.fragment);
			attr(input, "type", "range");
			input.value = /*$slice*/ ctx[2];
			attr(input, "id", "vol");
			attr(input, "name", "vol");
			attr(input, "min", "1");
			attr(input, "max", "20");
			attr(div0, "class", "flex-1");
			attr(div1, "class", "flex-1 bg-blue-100");
			attr(div2, "class", "flex justify-between container mx-auto px-4 space-x-4");
		},
		m(target, anchor) {
			mount_component(canvas, target, anchor);
			insert(target, t0, anchor);
			insert(target, input, anchor);
			insert(target, t1, anchor);
			insert(target, div2, anchor);
			append(div2, div0);
			mount_component(assetsgraph, div0, null);
			append(div2, t2);
			append(div2, div1);
			mount_component(graphpath, div1, null);
			current = true;

			if (!mounted) {
				dispose = listen(input, "change", /*onChange*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const canvas_changes = {};

			if (dirty & /*$$scope*/ 262144) {
				canvas_changes.$$scope = { dirty, ctx };
			}

			canvas.$set(canvas_changes);

			if (!current || dirty & /*$slice*/ 4) {
				input.value = /*$slice*/ ctx[2];
			}

			const assetsgraph_changes = {};
			if (dirty & /*$project*/ 2) assetsgraph_changes.project = /*$project*/ ctx[1];

			if (!updating_graph && dirty & /*graph*/ 1) {
				updating_graph = true;
				assetsgraph_changes.graph = /*graph*/ ctx[0];
				add_flush_callback(() => updating_graph = false);
			}

			assetsgraph.$set(assetsgraph_changes);
			const graphpath_changes = {};
			if (dirty & /*graph*/ 1) graphpath_changes.graph = /*graph*/ ctx[0];
			graphpath.$set(graphpath_changes);
		},
		i(local) {
			if (current) return;
			transition_in(canvas.$$.fragment, local);
			transition_in(assetsgraph.$$.fragment, local);
			transition_in(graphpath.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(canvas.$$.fragment, local);
			transition_out(assetsgraph.$$.fragment, local);
			transition_out(graphpath.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(canvas, detaching);
			if (detaching) detach(t0);
			if (detaching) detach(input);
			if (detaching) detach(t1);
			if (detaching) detach(div2);
			destroy_component(assetsgraph);
			destroy_component(graphpath);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $project;
	let $slice;
	component_subscribe($$self, project, $$value => $$invalidate(1, $project = $$value));
	component_subscribe($$self, slice, $$value => $$invalidate(2, $slice = $$value));
	let graph;
	let minx = 0;
	let maxx = 0;
	let miny = 0;
	let maxy = 0;
	let assets = getAssets($project);
	let connections = getConnections($project);

	/**
 * Define the canvas side and do redimension for stagedAssets for canvas
 */
	function getAssets({ stagedAssets }) {
		let xs = [], ys = [];
		let entries = Object.entries(stagedAssets);
		let positions = entries.map(([k, a]) => xs.push(a.initialState.x) & ys.push(a.initialState.y));
		minx = Math.min(...xs) - 20;
		maxx = Math.max(...xs) - 20;
		miny = Math.min(...ys) - 20;
		maxy = Math.max(...ys) - 20;

		return entries.map(([k, a]) => ({
			x: a.initialState.x - minx,
			y: a.initialState.y - miny,
			key: k
		}));
	}

	/**
 * Do the redimension for connections for canvas
 */
	function getConnections({ connections }) {
		let dicAssets = assets.reduce((a, c) => (a[c.key] = c) && a, {});

		let c = Object.entries(connections).map(([k, v]) => ({
			from: dicAssets[v.from],
			to: dicAssets[v.to]
		}));

		return c;
	}

	function onChange(event) {
		slice.update(x => x = event.target.value);
	}

	function assetsgraph_graph_binding(value) {
		graph = value;
		$$invalidate(0, graph);
	}

	return [
		graph,
		$project,
		$slice,
		assets,
		connections,
		onChange,
		assetsgraph_graph_binding
	];
}

class ProjectGraph extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default ProjectGraph;