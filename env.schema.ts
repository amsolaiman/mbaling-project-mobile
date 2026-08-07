import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const envSchema = Yup.object({
  // SYSTEM
  SYSTEM_TYPE: Yup.string()
    .required('SYSTEM_TYPE is required')
    .oneOf(['app'], 'SYSTEM_TYPE must be set to "app"'),
  // HOST
  EXPO_PUBLIC_HOST_API: Yup.string().required(
    'EXPO_PUBLIC_HOST_API is required'
  ),
});

export type EnvSchemaType = Yup.InferType<typeof envSchema>;

// ----------------------------------------------------------------------

export const validateEnv = (): EnvSchemaType => {
  try {
    return envSchema.validateSync(process.env, {
      abortEarly: false,
    }) as EnvSchemaType;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(
        `Environment variable validation failed:\n● ${error.errors.join('\n● ')}`
      );
    }
    throw error;
  }
};
