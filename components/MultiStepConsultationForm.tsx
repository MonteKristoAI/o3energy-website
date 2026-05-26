'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICES = [
  { value: 'project-development', label: 'Project Development', hint: 'Site assessment to signed PPA' },
  { value: 'epc', label: 'EPC', hint: 'Engineering, procurement, construction' },
  { value: 'installation-maintenance', label: 'Installation & Maintenance', hint: '25-year O&M' },
  { value: 'financing', label: 'Financing', hint: 'PPA, Pre-Paid PPA, ESA, direct purchase' },
  { value: 'asset-management', label: 'Asset Management', hint: '24/7 monitoring, billing, SREC' },
] as const

const TIMELINES = [
  { value: 'now', label: 'Right now', hint: 'Ready to start within 30 days' },
  { value: '1-3-months', label: 'In 1 to 3 months', hint: 'Site identified, finalizing scope' },
  { value: '3-12-months', label: 'In 3 to 12 months', hint: 'Planning and budgeting phase' },
  { value: 'exploring', label: 'Just exploring', hint: 'Researching options' },
] as const

const formSchema = z.object({
  services: z
    .array(z.string())
    .min(1, 'Pick at least one service you need.'),
  timeline: z.enum(['now', '1-3-months', '3-12-months', 'exploring'], {
    required_error: 'Select when you would like to start.',
  }),
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone is required'),
})

export type MultiStepFormValues = z.infer<typeof formSchema>

export interface MultiStepConsultationFormProps {
  onSubmitStub?: (values: MultiStepFormValues) => Promise<{ success: true }>
}

export function MultiStepConsultationForm({ onSubmitStub }: MultiStepConsultationFormProps) {
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<MultiStepFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      timeline: undefined as unknown as MultiStepFormValues['timeline'],
      name: '',
      company: '',
      email: '',
      phone: '',
    },
    mode: 'onChange',
  })

  const { watch, trigger, setValue } = form
  const selectedServices = watch('services') || []
  const selectedTimeline = watch('timeline')

  function toggleService(value: string) {
    const current = selectedServices
    const next = current.includes(value) ? current.filter((s) => s !== value) : [...current, value]
    setValue('services', next, { shouldValidate: true })
  }

  async function handleNext() {
    let valid = false
    if (step === 1) valid = await trigger(['services'])
    else if (step === 2) valid = await trigger(['timeline'])
    if (valid) setStep((p) => p + 1)
  }

  function handleBack() {
    setStep((p) => Math.max(1, p - 1))
  }

  async function onSubmit(values: MultiStepFormValues) {
    if (onSubmitStub) {
      await onSubmitStub(values)
    } else {
      await new Promise((r) => setTimeout(r, 600))
    }
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div
        className="bg-bg-white p-8 md:p-14 rounded-3xl border border-border text-center flex flex-col items-center justify-center min-h-[400px] shadow-sm"
        role="alert"
        aria-live="polite"
      >
        <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
        <h3 className="text-3xl font-display font-semibold text-brand-primary mb-4">Request received</h3>
        <p className="text-text-2 mb-8 max-w-md text-lg text-balance">
          Thanks. A consultant from O3 Energy will reach out within one business day to schedule the consultation.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSuccess(false)
            setStep(1)
            form.reset({
              services: [],
              timeline: undefined as unknown as MultiStepFormValues['timeline'],
              name: '',
              company: '',
              email: '',
              phone: '',
            })
          }}
          className="rounded-full px-8"
        >
          Submit another request
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-bg-white p-6 md:p-10 rounded-3xl border border-border shadow-[0_20px_40px_-15px_rgba(2,34,64,0.08)] relative overflow-hidden"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-primary/5">
          <div
            className="h-full bg-brand-orange transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="mb-8 mt-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-2 uppercase tracking-widest">Step {step} of 3</h3>
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-text-2 hover:text-brand-orange flex items-center transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </button>
          )}
        </div>

        {/* STEP 1 — Services (multi-select) */}
        <div className={cn('transition-all duration-500', step === 1 ? 'block' : 'hidden')}>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-primary mb-3 tracking-tight">
            Which services do you need?
          </h2>
          <p className="text-text-2 mb-8">
            Pick one or more. We will route your request to the right team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((opt) => {
              const checked = selectedServices.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleService(opt.value)}
                  aria-pressed={checked}
                  className={cn(
                    'text-left p-5 border-2 rounded-2xl transition-all flex items-start gap-4 group',
                    checked
                      ? 'border-brand-orange bg-brand-orange/5'
                      : 'border-border bg-bg-white hover:border-brand-primary/30 hover:bg-bg-cream',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 h-6 w-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors',
                      checked
                        ? 'bg-brand-orange border-brand-orange text-white'
                        : 'border-border-strong text-transparent group-hover:border-brand-primary/40',
                    )}
                    aria-hidden="true"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display font-semibold text-brand-primary">{opt.label}</span>
                    <span className="text-sm text-text-2 mt-0.5">{opt.hint}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <FormField
            control={form.control}
            name="services"
            render={() => (
              <FormItem>
                <FormMessage className="mt-4" />
              </FormItem>
            )}
          />
          <div className="pt-8">
            <Button
              type="button"
              onClick={handleNext}
              disabled={selectedServices.length === 0}
              size="lg"
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white rounded-full px-12 h-14 text-lg disabled:opacity-50"
            >
              Next: pick a timeline <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* STEP 2 — Timeline */}
        <div className={cn('transition-all duration-500', step === 2 ? 'block' : 'hidden')}>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-primary mb-3 tracking-tight">
            When would you like to start?
          </h2>
          <p className="text-text-2 mb-8">Approximate is fine. We will confirm the actual timeline on the call.</p>
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-3">
                    {TIMELINES.map((opt) => (
                      <FormItem
                        key={opt.value}
                        className="flex items-start space-x-3 space-y-0 p-5 border-2 border-border rounded-2xl has-[:checked]:border-brand-orange has-[:checked]:bg-brand-orange/5 cursor-pointer hover:bg-bg-cream transition-colors"
                      >
                        <FormControl>
                          <RadioGroupItem value={opt.value} className="text-brand-orange mt-0.5" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer w-full">
                          <span className="font-display font-semibold text-brand-primary block">{opt.label}</span>
                          <span className="text-sm text-text-2 mt-0.5 block">{opt.hint}</span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-8">
            <Button
              type="button"
              onClick={handleNext}
              disabled={!selectedTimeline}
              size="lg"
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white rounded-full px-12 h-14 text-lg disabled:opacity-50"
            >
              Final step: your details <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* STEP 3 — Contact details */}
        <div className={cn('transition-all duration-500', step === 3 ? 'block' : 'hidden')}>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-primary mb-3 tracking-tight">
            Where should we reach you?
          </h2>
          <p className="text-text-2 mb-8">A consultant will respond within one business day.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@yourcompany.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Recap of selections */}
          <div className="mt-8 p-5 bg-bg-cream rounded-2xl border border-border text-sm">
            <p className="text-text-2 mb-2 font-semibold">Your request</p>
            <p className="text-text-1">
              <span className="font-medium text-brand-primary">Services:</span>{' '}
              {selectedServices
                .map((s) => SERVICES.find((x) => x.value === s)?.label)
                .filter(Boolean)
                .join(', ') || '—'}
            </p>
            <p className="text-text-1 mt-1">
              <span className="font-medium text-brand-primary">Timeline:</span>{' '}
              {TIMELINES.find((t) => t.value === selectedTimeline)?.label || '—'}
            </p>
          </div>

          <div className="pt-8">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full h-14 text-lg shadow-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Schedule consultation'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
