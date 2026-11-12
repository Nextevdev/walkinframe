/* Architecture contract: the module graph the site is allowed to have. */
module.exports = {
	forbidden: [
		{
			name: "no-circular",
			comment: "Modules must not depend on each other in a loop.",
			severity: "error",
			from: {},
			to: { circular: true },
		},
		{
			name: "src-never-imports-entry",
			comment: "Feature modules are leaves: only main.js composes them.",
			severity: "error",
			from: { path: "^src/" },
			to: { path: "^main\\.js$" },
		},
		{
			name: "features-do-not-import-each-other",
			comment: "reel, tiles, reveal, copy and telemetry stay independent; shared code lives in env.js.",
			severity: "error",
			from: { path: "^src/(reel|tiles|reveal|copy|telemetry)\\.js$" },
			to: { path: "^src/(reel|tiles|reveal|copy|telemetry)\\.js$" },
		},
		{
			name: "no-npm-in-shipped-code",
			comment: "The shipped site has no build step, so it cannot import packages.",
			severity: "error",
			from: { path: "^(main\\.js|src/)" },
			to: { dependencyTypes: ["npm", "npm-dev", "npm-optional", "npm-peer", "npm-no-pkg", "npm-unknown"] },
		},
	],
	options: { doNotFollow: { path: "node_modules" } },
};
