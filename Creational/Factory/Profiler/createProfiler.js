import { Profiler } from './profiler';

const noopProfiler = {
  start() {},
  end() {}
};

export function createProfiler (label) {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler;
  }

  return new Profiler(label);
}
