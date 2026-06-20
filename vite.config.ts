import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Set VITE_BASE=/repo-name/ when deploying to GitHub Pages project site. */
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  plugins: [react()],
  base,
});
