import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["eslint.config.js", "manifest.json"],
                },
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".json"],
            },
        },
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "@stylistic/indent": ["error", 4],
            "@stylistic/comma-dangle": ["error"],
            "@stylistic/arrow-parens": ["error", "as-needed"],
            "@stylistic/quotes": ["error", "double"]
        },
    },
    // @ts-expect-error
    ...obsidianmd.configs!.recommended,
    {
        ignores: [
            "node_modules",
            "dist",
            "esbuild.config.mjs",
            "eslint.config.js",
            "version-bump.mjs",
            "versions.json",
            "main.js",
        ],
    },
);
