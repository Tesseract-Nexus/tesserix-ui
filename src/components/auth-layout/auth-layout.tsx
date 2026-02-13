import * as React from "react"

import { cn } from "../../lib/utils"

const AuthLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid min-h-screen grid-cols-1 bg-background text-foreground lg:grid-cols-2",
        className
      )}
      {...props}
    />
  )
)
AuthLayout.displayName = "AuthLayout"

const AuthLayoutBrand = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        "relative hidden overflow-hidden border-r bg-gradient-to-br from-primary/10 via-card to-background p-10 lg:flex lg:flex-col lg:justify-between",
        className
      )}
      {...props}
    />
  )
)
AuthLayoutBrand.displayName = "AuthLayoutBrand"

const AuthLayoutContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn("flex items-center justify-center px-4 py-10 sm:px-6", className)}
      {...props}
    />
  )
)
AuthLayoutContent.displayName = "AuthLayoutContent"

const AuthCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg sm:p-8", className)}
      {...props}
    />
  )
)
AuthCard.displayName = "AuthCard"

const AuthCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mb-6 space-y-1", className)} {...props} />
)
AuthCardHeader.displayName = "AuthCardHeader"

const AuthCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1 ref={ref} className={cn("text-xl font-semibold tracking-tight", className)} {...props} />
  )
)
AuthCardTitle.displayName = "AuthCardTitle"

const AuthCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
AuthCardDescription.displayName = "AuthCardDescription"

export {
  AuthLayout,
  AuthLayoutBrand,
  AuthLayoutContent,
  AuthCard,
  AuthCardHeader,
  AuthCardTitle,
  AuthCardDescription,
}
