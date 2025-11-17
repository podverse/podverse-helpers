
export type QueueNameParamKey = 'rss-slow' | 'rss-normal' | 'rss-on-demand' | 'rss-live';

export const validQueueNamesParamKeys: QueueNameParamKey[]
  = ['rss-slow', 'rss-normal', 'rss-on-demand', 'rss-live'];

type MQQueueName = 'rss-normal' | 'rss-on-demand' | 'rss-live';

interface MQQueueConfig {
  queueName: MQQueueName;
  dedupeCacheTimeMS: number | null;
  priority: 'normal' | 'slow';
}

export const MQ_QUEUES: Record<QueueNameParamKey, MQQueueConfig> = {
  "rss-slow":{
    queueName: 'rss-normal',
    dedupeCacheTimeMS: 15 * 60 * 1000,
    priority: 'slow'
  },
  "rss-normal":{
    queueName: 'rss-normal',
    dedupeCacheTimeMS: 5 * 60 * 1000,
    priority: 'normal'
  },
  "rss-on-demand": {
    queueName: 'rss-on-demand',
    dedupeCacheTimeMS: 5 * 60 * 1000,
    priority: 'normal'
  },
  "rss-live": {
    queueName: 'rss-live',
    dedupeCacheTimeMS: null,
    priority: 'normal'
  }
};
