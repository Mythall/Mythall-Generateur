import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  const root = "src";

  return {
    root,
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, `${root}/index.html`),
          login: resolve(__dirname, `${root}/login.html`),
          register: resolve(__dirname, `${root}/register.html`),
          error: resolve(__dirname, `${root}/error.html`)
        }
      }
    }
  };
});
