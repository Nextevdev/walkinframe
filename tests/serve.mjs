/* Small static server for the end-to-end tests: threaded, with range support for video. */
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const types = {
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".mp4": "video/mp4",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
};
const root = process.cwd();

createServer((request, response) => {
	const path = normalize(decodeURIComponent(new URL(request.url, "http://x").pathname)).replace(/^[\\/]+/, "");
	const file = join(root, path === "" ? "index.html" : path);
	let stat;
	try {
		stat = statSync(file);
	} catch {
		response.writeHead(404).end();
		return;
	}
	if (!file.startsWith(root) || !stat.isFile()) {
		response.writeHead(404).end();
		return;
	}
	const type = types[extname(file)] ?? "application/octet-stream";
	const range = request.headers.range?.match(/bytes=(\d*)-(\d*)/);
	if (range) {
		const start = range[1] ? Number(range[1]) : 0;
		const end = range[2] ? Number(range[2]) : stat.size - 1;
		response.writeHead(206, {
			"Content-Type": type,
			"Content-Range": `bytes ${start}-${end}/${stat.size}`,
			"Content-Length": end - start + 1,
			"Accept-Ranges": "bytes",
		});
		createReadStream(file, { start, end }).pipe(response);
		return;
	}
	response.writeHead(200, { "Content-Type": type, "Content-Length": stat.size, "Accept-Ranges": "bytes" });
	createReadStream(file).pipe(response);
}).listen(8766, "127.0.0.1");
