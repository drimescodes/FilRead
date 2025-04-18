// src/data/dummyStats.ts
export type StatsPoint = { period: string; count: number }
export type Range = 'today' | 'weekly' | 'monthly' | 'all'

export const dummyStats: Record<Range, StatsPoint[]> = {
  today: [
    { period: '00:00', count: 2 },
    { period: '04:00', count: 5 },
    { period: '08:00', count: 3 },
    { period: '12:00', count: 9 },
    { period: '16:00', count: 7 },
    { period: '20:00', count: 4 },
  ],
  weekly: [
    { period: 'Mon', count: 12 },
    { period: 'Tue', count: 18 },
    { period: 'Wed', count: 9 },
    { period: 'Thu', count: 14 },
    { period: 'Fri', count: 7 },
    { period: 'Sat', count: 5 },
    { period: 'Sun', count: 10 },
  ],
  monthly: [
    { period: 'Week 1', count: 45 },
    { period: 'Week 2', count: 38 },
    { period: 'Week 3', count: 52 },
    { period: 'Week 4', count: 48 },
  ],
  all: [
    { period: 'Jan', count: 120 },
    { period: 'Feb', count: 98 },
    { period: 'Mar', count: 134 },
    { period: 'Apr', count: 89 },
    { period: 'May', count: 110 },
    { period: 'Jun', count: 95 },
    // …
  ],
}
