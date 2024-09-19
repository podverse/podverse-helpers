import { config } from '../config';
import { logger } from './logger';

class TimerManager {
  private timers: Map<string, number>;

  constructor() {
    this.timers = new Map();
  }

  start(label: string): void {
    if (config.shouldLogTimer) {
      this.timers.set(label, performance.now());
    }
  }

  end(label: string, preventLog?: boolean): number {
    if (config.shouldLogTimer) {
      const startTime = this.timers.get(label);
      if (startTime !== undefined) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        if (!preventLog) {
          logger.info(`${label} took ${duration}ms`);
        }
        this.timers.delete(label);
        return duration;
      }
    }
    return 0;
  }

  endAll(): void {
    if (config.shouldLogTimer) {
      this.timers.forEach((startTime, label) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        logger.info(`${label} took ${duration}ms`);
      });
      this.timers.clear();
    }
  }
}

export const timerManager = new TimerManager();
