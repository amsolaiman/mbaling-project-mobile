/**
 * Stabilizes the Expo/React Native autolinking config sources against pnpm
 * virtual-store folder naming differences (node_modules/.pnpm/<pkg>@<ver>_<hash>/...).
 *
 * pnpm truncates/encodes these folder names differently depending on pnpm
 * version (and sometimes platform), even when the resolved dependency graph
 * is identical. Since expoAutolinkingConfig / rncoreAutolinkingConfig embed
 * the literal sourceDir path for every module, that noise leaks straight
 * into the fingerprint hash and causes false "runtime version mismatch"
 * errors between local and EAS builds.
 *
 * This strips the `.pnpm/<encoded-key>/node_modules/` segment down to a
 * stable `node_modules/` prefix before hashing, so only the actual package
 * subpath (e.g. `node_modules/@expo/dom-webview/android`) affects the hash.
 *
 * NOTE: this treats the symptom, not the root cause. Prefer pinning pnpm
 * via `packageManager` + corepack so local and EAS use the exact same pnpm
 * version — this config is a safety net for any residual drift (e.g. OS
 * differences, pnpm patch versions) that pinning alone doesn't catch.
 *
 * @type {import('expo/fingerprint').Config}
 */
const AUTOLINKING_CONFIG_IDS = new Set([
  'expoAutolinkingConfig:android',
  'expoAutolinkingConfig:ios',
  'rncoreAutolinkingConfig:android',
  'rncoreAutolinkingConfig:ios',
]);

// Matches the pnpm virtual-store segment of a path, e.g.:
//   node_modules/.pnpm/@expo+dom-webview@57.0.1_ex_09eb42a.../node_modules/
//   node_modules/.pnpm/expo-asset@57.0.16_expo@57._c471cb0f.../node_modules/
// and collapses it down to a plain `node_modules/`.
const PNPM_STORE_SEGMENT = /node_modules\/\.pnpm\/[^/"]+\/node_modules\//g;

const config = {
  fileHookTransform: (source, chunk, isEndOfFile, encoding) => {
    if (source.type === 'contents' && AUTOLINKING_CONFIG_IDS.has(source.id)) {
      if (chunk == null) {
        return chunk;
      }
      const text = typeof chunk === 'string' ? chunk : chunk.toString(encoding);
      return text.replace(PNPM_STORE_SEGMENT, 'node_modules/');
    }
    return chunk;
  },
};

module.exports = config;
