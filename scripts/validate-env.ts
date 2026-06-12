import dotenv from 'dotenv';

// ----------------------------------------------------------------------

dotenv.config();

async function main() {
  const { validateEnv } = await import('../env.schema');

  validateEnv();
  console.log('Environment variable validation successful.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
