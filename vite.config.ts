import { defineConfig } from "vite";

export default defineConfig({
	root: "src",
	base: "",
	build: {
		minify: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				main: "src/index.html",
			},
		},
	},
	css: {
		modules: {
			scopeBehaviour: "global",
		},
	},
	server: {
		hmr: true,
	},
});
