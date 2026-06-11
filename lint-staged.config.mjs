const lintStagedConfig = {
  '**/*.{js,ts,jsx,tsx}': [
    () => 'pnpm lint',
    () => 'pnpm check:type',
    'prettier --write',
  ],
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
};

export default lintStagedConfig;
