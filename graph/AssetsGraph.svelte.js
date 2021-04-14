/* src/graph/AssetsGraph.svelte generated by Svelte v3.35.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	destroy_each,
	detach,
	element,
	empty,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	set_store_value,
	space,
	text
} from "../_snowpack/pkg/svelte/internal.js";

import { start, slice } from "../stores.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (58:0) {:else}
function create_else_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "No graph found";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (49:4) {#if node.children.length}
function create_if_block(ctx) {
	let span;
	let t;
	let each_value_1 = /*node*/ ctx[8].children.map(/*func_1*/ ctx[5]);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	return {
		c() {
			span = element("span");
			t = text("->\n        ");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(span, "class", "px-3");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*points, $slice*/ 6) {
				each_value_1 = /*node*/ ctx[8].children.map(/*func_1*/ ctx[5]);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (52:8) {#each node.children.map((c) => c.slice(-$slice)) as node}
function create_each_block_1(ctx) {
	let span;
	let t_value = /*node*/ ctx[8] + "";
	let t;

	return {
		c() {
			span = element("span");
			t = text(t_value);
			attr(span, "class", "mx-1 px-1 border border-gray-300");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*points, $slice*/ 6 && t_value !== (t_value = /*node*/ ctx[8] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (43:0) {#each points.filter((p) => p.type == 'a') as node}
function create_each_block(ctx) {
	let div;
	let span;
	let t0_value = /*node*/ ctx[8].id.slice(-/*$slice*/ ctx[2]) + "";
	let t0;
	let t1;
	let t2;
	let mounted;
	let dispose;
	let if_block = /*node*/ ctx[8].children.length && create_if_block(ctx);

	function click_handler() {
		return /*click_handler*/ ctx[6](/*node*/ ctx[8]);
	}

	return {
		c() {
			div = element("div");
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			attr(div, "class", "hover:bg-gray-300 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span);
			append(span, t0);
			append(div, t1);
			if (if_block) if_block.m(div, null);
			append(div, t2);

			if (!mounted) {
				dispose = listen(div, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*points, $slice*/ 6 && t0_value !== (t0_value = /*node*/ ctx[8].id.slice(-/*$slice*/ ctx[2]) + "")) set_data(t0, t0_value);

			if (/*node*/ ctx[8].children.length) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, t2);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div;
	let span0;
	let t1;
	let span1;
	let t2_value = Object.entries(/*project*/ ctx[0].stagedAssets).length + "";
	let t2;
	let t3;
	let span2;
	let t4_value = Object.entries(/*project*/ ctx[0].connections).length + "";
	let t4;
	let t5;
	let each_1_anchor;
	let each_value = /*points*/ ctx[1].filter(func);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block(ctx);
	}

	return {
		c() {
			div = element("div");
			span0 = element("span");
			span0.textContent = "Adjacency List:";
			t1 = space();
			span1 = element("span");
			t2 = text(t2_value);
			t3 = space();
			span2 = element("span");
			t4 = text(t4_value);
			t5 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();

			if (each_1_else) {
				each_1_else.c();
			}

			attr(span0, "class", "p-1");
			attr(span1, "class", "p-1");
			attr(span2, "class", "p-1");
			attr(div, "class", "flex text-lg");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span0);
			append(div, t1);
			append(div, span1);
			append(span1, t2);
			append(div, t3);
			append(div, span2);
			append(span2, t4);
			insert(target, t5, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);

			if (each_1_else) {
				each_1_else.m(target, anchor);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*project*/ 1 && t2_value !== (t2_value = Object.entries(/*project*/ ctx[0].stagedAssets).length + "")) set_data(t2, t2_value);
			if (dirty & /*project*/ 1 && t4_value !== (t4_value = Object.entries(/*project*/ ctx[0].connections).length + "")) set_data(t4, t4_value);

			if (dirty & /*changeStart, points, $slice*/ 14) {
				each_value = /*points*/ ctx[1].filter(func);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;

				if (each_value.length) {
					if (each_1_else) {
						each_1_else.d(1);
						each_1_else = null;
					}
				} else if (!each_1_else) {
					each_1_else = create_else_block(ctx);
					each_1_else.c();
					each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (detaching) detach(t5);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
			if (each_1_else) each_1_else.d(detaching);
		}
	};
}

function generate({ stagedAssets, connections }) {
	let assetsTo = Object.keys(stagedAssets).reduce((a, n, i) => (a[n] = { id: n, children: [], type: "a" }) && a, {});
	let connectsTo = Object.keys(connections).reduce((a, n, i) => (a[n] = { id: n, children: [], type: "c" }) && a, {});
	let nodesTo = Object.assign({}, assetsTo, connectsTo);

	Object.entries(connections).map(([id, { from, to }]) => {
		nodesTo[from].children = [...nodesTo[from].children, id];
		nodesTo[id].children = [...nodesTo[id].children, to];
	});

	return nodesTo;
}

const func = p => p.type == "a";

function instance($$self, $$props, $$invalidate) {
	let points;
	let $start;
	let $slice;
	component_subscribe($$self, start, $$value => $$invalidate(7, $start = $$value));
	component_subscribe($$self, slice, $$value => $$invalidate(2, $slice = $$value));
	let { project } = $$props;
	let { graph = [] } = $$props;

	function changeStart(id) {
		set_store_value(start, $start = id, $start);
	}

	const func_1 = c => c.slice(-$slice);
	const click_handler = node => changeStart(node.id);

	$$self.$$set = $$props => {
		if ("project" in $$props) $$invalidate(0, project = $$props.project);
		if ("graph" in $$props) $$invalidate(4, graph = $$props.graph);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*project*/ 1) {
			$: $$invalidate(4, graph = generate(project));
		}

		if ($$self.$$.dirty & /*graph*/ 16) {
			$: $$invalidate(1, points = Object.keys(graph).map(k => graph[k]));
		}
	};

	return [project, points, $slice, changeStart, graph, func_1, click_handler];
}

class AssetsGraph extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { project: 0, graph: 4 });
	}
}

export default AssetsGraph;