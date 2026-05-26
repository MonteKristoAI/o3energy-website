import { Metric } from '../types'

/**
 * Metrics sourced from o3energy.com home page as last reported.
 * If the underlying figures change, edit here only; pages reference this one source.
 */
export const metricsData: Metric[] = [
  { value: 94796, label: 'kW Installed', duration: 2 },
  { value: 424, label: 'Customers Served', duration: 2.4 },
  { value: 104, label: 'Jobs Created', duration: 2.4 },
  { value: 14, label: 'Years Operating', suffix: '+', duration: 1.5 },
]
