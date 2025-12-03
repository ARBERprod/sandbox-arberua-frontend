import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import React from 'react';

jest.mock('swiper/css', jest.fn());

// Global mock for Svg component to avoid SVG import issues in tests
jest.mock('@/shared/ui/Svg', () => ({
  Svg: ({ className, 'data-testid': testId }) => React.createElement('span', { className, 'data-testid': testId || 'svg-mock' }),
}));

// Mock matchMedia - use regular function, not jest.fn() to survive resetAllMocks
const createMatchMedia = (query) => ({
  matches: false,
  media: query || '',
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query) => createMatchMedia(query),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock;

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
window.IntersectionObserver = IntersectionObserverMock;

export {};
