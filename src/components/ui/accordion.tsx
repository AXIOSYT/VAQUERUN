import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('faq-item', className)} {...props} />
}
export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="faq-heading">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn('faq-trigger', className)} {...props}>
        {children}<ChevronDown size={20} className="faq-chevron" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className={cn('faq-content', className)} {...props}>
      <div className="faq-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  )
}
