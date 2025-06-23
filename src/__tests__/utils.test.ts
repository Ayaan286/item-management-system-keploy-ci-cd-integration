import { cn } from '../lib/utils';

// Mock only tailwind-merge for predictable output
jest.mock('tailwind-merge', () => ({
  twMerge: (input: string) => input, // identity for test
}));

describe('cn utility', () => {
  it('merges multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('ignores empty, undefined, or null values', () => {
    expect(cn('foo', undefined, '', null, 'bar')).toBe('foo bar');
  });

  it('returns an empty string if no arguments', () => {
    expect(cn()).toBe('');
  });
}); 