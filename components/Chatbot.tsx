'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function Chatbot({ placeholderQA = [] }: { placeholderQA?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(false)
  
  const defaultQA = [
    { q: 'What capacity range do you do?', a: 'We specialize in commercial and utility-scale projects ranging from 100kW up to 10MW+.' },
    { q: 'Where are you located?', a: 'Our headquarters is in Dallas, TX, with regional offices in San Francisco, Mexico, and Guam.' },
    { q: 'Do you offer financing?', a: 'Yes, we offer flexible financing structures including PPAs and capital leases.' }
  ]
  
  const qa = placeholderQA.length > 0 ? placeholderQA : defaultQA

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-24 lg:bottom-6 right-6 h-14 w-14 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg z-50 transition-transform hover:scale-105"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-2xl border-border fixed bottom-24 lg:bottom-24 right-6 top-auto left-auto translate-x-0 translate-y-0 max-h-[80vh]">
        <DialogHeader className="bg-brand-primary p-4 text-white">
          <DialogTitle className="text-white flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            O3 Energy Assistant
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 h-[400px] flex flex-col bg-bg-cream">
          <div className="flex-1 overflow-y-auto pr-2 pb-4">
            <div className="flex flex-col gap-4">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm font-body">
                Hello! I'm the O3 Energy virtual assistant. How can I help you today?
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-xs text-text-2 uppercase font-semibold tracking-wider">Suggested questions</span>
                {qa.map((item, idx) => (
                  <button key={idx} className="text-left bg-white border border-border p-3 rounded-xl text-sm hover:border-brand-orange hover:text-brand-orange transition-colors" onClick={() => {}}>
                    {item.q}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-border mt-auto">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Type a message..." className="flex-1 rounded-full border border-border px-4 py-2 text-sm focus:outline-none focus:border-brand-orange bg-white" disabled />
              <Button type="button" size="icon" className="rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shrink-0" disabled>
                <MessageCircle className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
