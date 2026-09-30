import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const envSchema = Yup.object({
  // APP
  EXPO_PUBLIC_ENV: Yup.string()
    .required('EXPO_PUBLIC_ENV is required')
    .oneOf(['dev', 'uat', 'prod']),
  // HOST
  EXPO_PUBLIC_HOST_API: Yup.string()
    .url()
    .required('EXPO_PUBLIC_HOST_API is required'),
  EXPO_PUBLIC_PSGC_API: Yup.string()
    .url()
    .required('EXPO_PUBLIC_PSGC_API is required'),
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
