/** @format */
module.exports = {
    extends: [
        'universe/native',
        // 'prettier',
        // 'prettier/react',
        // 'prettier/@typescript-eslint',
    ],
    plugins: [ 'unused-imports', 'import' ],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    rules: {
        // 'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
            },
        ],
        'react-hooks/exhaustive-deps': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: [ 'builtin', 'external', 'parent', 'sibling', 'index' ],
            },
        ],
    },
};
