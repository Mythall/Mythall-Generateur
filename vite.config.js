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
          personnage: resolve(__dirname, `${root}/personnage/index.html`),
          creation: resolve(__dirname, `${root}/personnage/creation.html`),
          progression: resolve(__dirname, `${root}/personnage/progression.html`),
          compte: resolve(__dirname, `${root}/compte/index.html`),
          personnagesList: resolve(__dirname, `${root}/organisateur/personnages/index.html`),
          personnagesForm: resolve(__dirname, `${root}/organisateur/personnages/form.html`),
          preinscription: resolve(__dirname, `${root}/preinscription/index.html`),
          sortsList: resolve(__dirname, `${root}/organisateur/sorts/index.html`),
          sortsForm: resolve(__dirname, `${root}/organisateur/sorts/form.html`),
          error: resolve(__dirname, `${root}/error.html`)
        }
      }
    }
  };
});
