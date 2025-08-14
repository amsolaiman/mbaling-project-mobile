const lintStagedConfig = {
  '**/*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
  '**/*.ts?(x)': () => 'tsc --noEmit --skipLibCheck',
  '**/*.(spec|test).ts?(x)': [
    'jest --bail --findRelatedTests --passWithNoTests',
  ],
};

export default lintStagedConfig;
