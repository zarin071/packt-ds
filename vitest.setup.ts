import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from 'vitest-axe/matchers';

// vitest-axe is the vitest-native port of jest-axe (same `axe()` API + the
// `toHaveNoViolations` matcher), wired into vitest's expect here.
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
