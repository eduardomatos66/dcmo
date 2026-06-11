import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // Ignorar no-undef por agora para evitar falsos positivos com variáveis globais como window/document ou imports automáticos
    }
  }
];
