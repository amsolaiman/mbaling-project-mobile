const lintStagedConfig = {
  '**/*.{js,ts,tsx}': [() => 'pnpm lint', () => 'pnpm check:type', 'prettier --write'],
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
  '**/*.ts?(x)': [() => 'pnpm check:type'],
  '**/*.(spec|test).ts?(x)': ['jest --passWithNoTests'],
};

export default lintStagedConfig;
