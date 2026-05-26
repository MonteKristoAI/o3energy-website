import { ProcessStep } from '@/lib/types'
import { cn } from '@/lib/utils'

export interface ProcessTimelineProps {
  steps: ProcessStep[]
  orientation?: 'horizontal' | 'vertical'
  variant?: 'light' | 'dark'
}

export function ProcessTimeline({
  steps,
  orientation = 'horizontal',
  variant = 'light',
}: ProcessTimelineProps) {
  const isHorizontal = orientation === 'horizontal'
  const isDark = variant === 'dark'

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-2">
      <ol
        className={cn(
          'relative',
          isHorizontal
            ? 'flex flex-col md:flex-row md:items-start gap-12 md:gap-4'
            : 'flex flex-col gap-12',
        )}
      >
        {/* Horizontal connector for md+ */}
        {isHorizontal && (
          <div
            className={cn(
              'hidden md:block absolute top-10 h-[2px]',
              isDark ? 'bg-white/15' : 'bg-brand-primary/12',
            )}
            style={{ left: 'calc(50% / ' + steps.length + ')', right: 'calc(50% / ' + steps.length + ')' }}
            aria-hidden="true"
          />
        )}

        {/* Vertical connector for mobile */}
        {isHorizontal && (
          <div
            className={cn(
              'md:hidden absolute left-[2.5rem] top-0 bottom-0 w-[2px]',
              isDark ? 'bg-white/15' : 'bg-brand-primary/12',
            )}
            aria-hidden="true"
          />
        )}

        {steps.map((step) => (
          <li
            key={step.number}
            className={cn(
              'flex relative z-10 flex-1 min-w-0',
              isHorizontal
                ? 'flex-row md:flex-col items-start gap-6 md:gap-6'
                : 'flex-row items-start gap-6',
            )}
          >
            {/* Step circle */}
            <div className="flex flex-col items-center shrink-0 md:items-start">
              <div
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_24px_-12px_rgba(2,34,64,0.25)] relative',
                  isDark
                    ? 'bg-brand-orange text-white ring-4 ring-brand-orange/15'
                    : 'bg-white text-brand-primary ring-4 ring-brand-orange/12',
                )}
              >
                <step.icon className="h-8 w-8" />
                <span
                  className={cn(
                    'absolute -top-2 -right-2 h-7 min-w-[1.75rem] px-1 rounded-full text-xs font-display font-bold flex items-center justify-center shadow-sm',
                    isDark ? 'bg-white text-brand-primary' : 'bg-brand-orange text-white',
                  )}
                  aria-hidden="true"
                >
                  {String(step.number).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Step text */}
            <div
              className={cn(
                'flex flex-col pt-2 min-w-0',
                isHorizontal ? 'md:pt-2 pr-4 md:pr-2' : '',
              )}
            >
              <span
                className={cn(
                  'text-eyebrow mb-2 block',
                  isDark ? 'text-brand-orange' : 'text-brand-orange',
                )}
              >
                Phase {step.number}
              </span>
              <h3
                className={cn(
                  'text-xl md:text-2xl font-display font-semibold mb-2 tracking-tight',
                  isDark ? 'text-white' : 'text-brand-primary',
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  'leading-relaxed max-w-[40ch] text-pretty',
                  isDark ? 'text-white/75' : 'text-text-2',
                )}
              >
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
