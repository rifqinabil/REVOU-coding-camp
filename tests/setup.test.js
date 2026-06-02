/**
 * setup.test.js — Smoke test to verify Vitest + jsdom + fast-check are working.
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

describe('Test runner setup', () => {
    it('vitest runs correctly', () => {
        expect(1 + 1).toBe(2);
    });

    it('jsdom environment is available', () => {
        expect(typeof document).toBe('object');
        expect(document.createElement('div')).toBeTruthy();
    });

    it('fast-check is available and works', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (a, b) => {
                return a + b === b + a; // commutativity
            }),
            { numRuns: 100 }
        );
    });
});
