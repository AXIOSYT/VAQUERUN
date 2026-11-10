import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'ui-button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'ui-button-primary',
        secondary: 'ui-button-secondary',
        outline: 'ui-button-outline',
        ghost: 'ui-button-ghost',
      },
      size: { default: 'ui-size-default', sm: 'ui-size-sm', lg: 'ui-size-lg', icon: 'ui-size-icon' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export function Button({
  className, variant, size, asChild = false, ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
