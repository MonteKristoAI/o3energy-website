import { FAQ } from '@/lib/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface FAQAccordionProps {
  items: FAQ[]
  generateSchema?: boolean
}

export function FAQAccordion({ items, generateSchema = true }: FAQAccordionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {items.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-border px-6 bg-white mb-4 rounded-2xl border data-[state=open]:border-brand-orange/50 data-[state=open]:shadow-sm transition-all overflow-hidden">
            <AccordionTrigger className="text-left font-display font-semibold text-brand-primary text-lg hover:no-underline hover:text-brand-orange py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-text-2 text-base leading-relaxed pb-6 pr-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
