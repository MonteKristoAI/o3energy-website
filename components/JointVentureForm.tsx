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
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters'),
  capacityKw: z.coerce.number().min(100, 'Capacity must be at least 100 kW'),
  state: z.string().min(2, 'Please select a state'),
  stage: z.enum(['idea', 'sited', 'permitting', 'financed'], {
    required_error: 'Please select the current stage of the project',
  }),
  contactName: z.string().min(2, 'Name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactCompany: z.string().min(2, 'Company is required'),
})

export type JVFormValues = z.infer<typeof formSchema>

export interface JointVentureFormProps {
  onSubmitStub?: (values: JVFormValues) => Promise<{ success: true }>
}

export function JointVentureForm({ onSubmitStub }: JointVentureFormProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<JVFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      state: '',
      contactName: '',
      contactEmail: '',
      contactCompany: '',
    },
  })

  async function onSubmit(values: JVFormValues) {
    if (onSubmitStub) {
      await onSubmitStub(values)
      setIsSuccess(true)
    } else {
      await new Promise(resolve => setTimeout(resolve, 600))
      setIsSuccess(true)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-brand-dark p-8 md:p-16 rounded-3xl border border-white/10 text-center text-white shadow-xl min-h-[500px] flex flex-col items-center justify-center" role="alert" aria-live="polite">
        <div className="w-24 h-24 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-[0_0_40px_rgba(243,110,32,0.4)]">✓</div>
        <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-balance">Submission received</h3>
        <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg md:text-xl text-balance">Our acquisitions team will review the project and reply within one business day.</p>
        <Button onClick={() => { setIsSuccess(false); form.reset() }} className="bg-white/10 hover:bg-white/20 text-white border-none rounded-full px-8">Submit another project</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-bg-white p-6 md:p-10 rounded-3xl border border-border shadow-floating">
        
        <div className="space-y-6">
          <h3 className="text-xl font-display font-semibold text-brand-primary border-b border-border pb-2">Project Details</h3>
          
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. West Texas Solar Farm Phase 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="capacityKw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Capacity (kW) *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5000" {...field} />
                  </FormControl>
                  <FormDescription>e.g. 500 for 500 kW, 5000 for 5 MW</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project State/Region *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="GU">Guam</SelectItem>
                      <SelectItem value="Other">Other / International</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Current Project Stage *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {[
                      { value: 'idea', label: 'Idea / Preliminary' },
                      { value: 'sited', label: 'Site Secured / Interconnection' },
                      { value: 'permitting', label: 'Fully Permitted / NTP' },
                      { value: 'financed', label: 'Under Construction' },
                    ].map((opt) => (
                      <FormItem key={opt.value} className="flex items-center space-x-3 space-y-0 p-4 border border-border rounded-xl has-[:checked]:border-brand-orange has-[:checked]:bg-brand-orange/5 cursor-pointer hover:bg-bg-cream transition-colors">
                        <FormControl>
                          <RadioGroupItem value={opt.value} className="text-brand-orange" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer w-full text-sm md:text-base">
                          {opt.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-display font-semibold text-brand-primary border-b border-border pb-2">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Development Company *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your development company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" className="w-full bg-brand-primary hover:bg-brand-dark text-white rounded-xl h-16 text-lg shadow-lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit Project for Review'}
        </Button>
      </form>
    </Form>
  )
}
