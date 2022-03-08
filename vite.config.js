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
          connexion: resolve(__dirname, `${root}/compte/connexion/index.html`),
          inscription: resolve(__dirname, `${root}/compte/inscription/index.html`),
          motDePasseOublie: resolve(__dirname, `${root}/compte/mot-de-passe-oublie/index.html`),
          personnage: resolve(__dirname, `${root}/compte/personnage/index.html`),
          compte: resolve(__dirname, `${root}/compte/index.html`),
          error: resolve(__dirname, `${root}/error.html`)
        }
      }
    }
  };
});
