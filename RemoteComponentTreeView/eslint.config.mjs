import js from '@eslint/js';
import checkFilePlugin from 'eslint-plugin-check-file';
import cssModulesPlugin from 'eslint-plugin-css-modules';
import noUnsanitizedPlugin from 'eslint-plugin-no-unsanitized';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintUnicornPlugin from 'eslint-plugin-unicorn';
import eslintUnusedImportsPlugin from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'build/**',
      'out/**',
      'node_modules/**',
      'locales/**',
      'images/**',
      '*.js',
      '*.ts',
      '*.mjs',
      'public-path.js'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'check-file': checkFilePlugin,
      'unused-imports': eslintUnusedImportsPlugin,
      'css-modules': cssModulesPlugin,
      'no-unsanitized': noUnsanitizedPlugin,
      'unicorn': eslintUnicornPlugin
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      /*
       * === Unicorn ===
       */
      'unicorn/better-regex': 'warn',
      'unicorn/catch-error-name': 'error',
      'unicorn/error-message': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-lonely-if': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/throw-new-error': 'error',

      /*
       * === React ===
       */
      'react/jsx-uses-react': 'off',
      'react/jsx-no-bind': [
        'error',
        { allowArrowFunctions: true, ignoreRefs: true, allowBind: false }
      ],
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/prefer-stateless-function': 'warn',

      /*
       * === React Hooks ===
       */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      /*
       * === TypeScript ===
       */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-shadow': ['error', { hoist: 'all' }],
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/triple-slash-reference': [
        'error',
        { path: 'always', types: 'prefer-import', lib: 'always' }
      ],
      '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        { ignoreParameters: true, ignoreProperties: true }
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      /*
       * === General ===
       */
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'eol-last': ['error', 'always'],
      'no-eval': 'error',
      'eqeqeq': ['error', 'smart'],
      'consistent-return': 'error',
      'prefer-const': 'error',
      'no-throw-literal': 'error',
      'no-array-constructor': 'error',
      'no-useless-return': 'error',
      'no-undef-init': 'error',
      'no-unsafe-finally': 'error',
      'no-empty': 'error',
      'yoda': ['error'],
      'unicode-bom': ['error', 'never'],
      'no-irregular-whitespace': 'error',
      'no-multi-assign': 'error',
      'no-new-wrappers': 'error',
      'no-extra-bind': 'error',
      'no-cond-assign': 'error',
      'no-caller': 'error',
      'block-scoped-var': 'error',
      'no-implicit-globals': 'error',
      'no-useless-constructor': 'error',
      'prefer-object-spread': 'warn',
      'object-shorthand': 'error',
      'no-duplicate-imports': 'error',
      'prefer-arrow-callback': 'warn',

      /*
       * === XSS protection ===
       */
      'no-new-func': 'error',
      'no-script-url': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      'react/no-danger': 'error',
      'react/no-danger-with-children': 'error',
      'react/iframe-missing-sandbox': 'error',
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',

      /*
       * === React ===
       */
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-boolean-value': ['error', 'always'],
      'react/void-dom-elements-no-children': 'error',
      'react/style-prop-object': 'error',
      'react/no-children-prop': 'error',

      /*
       * === Imports ===
       */
      'unused-imports/no-unused-imports': 'error',

      /*
       * === CSS Modules ===
       */
      'css-modules/no-undef-class': ['error', { camelCase: true }],

      /*
       * === Prettier ===
       */
      'prettier/prettier': 'warn',

      /*
       * === File/folder naming ===
       */
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/*.{ts,tsx}': 'KEBAB_CASE'
        },
        { ignoreMiddleExtensions: true }
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE'
        }
      ]
    }
  }
);
