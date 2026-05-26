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
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy' }),
  }),
})

export type ContactFormValues = z.infer<typeof formSchema>

export interface ContactFormProps {
  defaultValues?: Partial<ContactFormValues>
  onSubmitStub?: (values: ContactFormValues) => Promise<{ success: true }>
}

export function ContactForm({ defaultValues, onSubmitStub }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      company: defaultValues?.company || '',
      email: defaultValues?.email || '',
      phone: defaultValues?.phone || '',
      message: defaultValues?.message || '',
      consent: undefined as unknown as true,
    },
  })

  async function onSubmit(values: ContactFormValues) {
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
      <div className="bg-brand-primary/5 p-8 md:p-12 rounded-3xl border border-border text-center flex flex-col items-center justify-center min-h-[400px]" role="alert" aria-live="polite">
        <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">✓</div>
        <h3 className="text-3xl font-display font-semibold text-brand-primary mb-4">Message Received</h3>
        <p className="text-text-2 mb-8 max-w-md text-lg">Thanks for reaching out. A member of our commercial team will respond within 1 business day.</p>
        <Button variant="outline" onClick={() => { setIsSuccess(false); form.reset() }} className="rounded-full px-8">Send another message</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" className="bg-bg-white" {...field} />
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
                  <Input placeholder="Your company" className="bg-bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@yourcompany.com" className="bg-bg-white" {...field} />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(555) 123-4567" className="bg-bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="How can we help you?" 
                  className="min-h-[120px] bg-bg-white resize-y" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border p-4 bg-bg-white">
              <FormControl>
                <input 
                  type="checkbox" 
                  className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-brand-primary ring-offset-bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-brand-orange accent-brand-orange"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none pt-0.5">
                <FormLabel className="font-normal text-text-2 text-sm leading-snug cursor-pointer">
                  I agree to receive communications from O3 Energy regarding my inquiry. I have read the privacy policy. *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full h-14 text-lg font-semibold shadow-md" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  )
}
