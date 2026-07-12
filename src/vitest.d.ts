// Test-matcher type augmentations for vitest's `expect`, made visible to tsc
// (this file lives under src/, which tsconfig includes). The runtime wiring is
// in vitest.setup.ts.
import '@testing-library/jest-dom/vitest';
import 'vitest';

interface AxeMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
