import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { Button } from "../button"
import { Input } from "../input"
import { Label } from "../label"
import {
  AuthCard,
  AuthCardDescription,
  AuthCardHeader,
  AuthCardTitle,
  AuthLayout,
  AuthLayoutBrand,
  AuthLayoutContent,
} from "./auth-layout"

const meta = {
  title: "Layout/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AuthLayout>

export default meta
type Story = StoryObj<typeof meta>

export const SignIn: Story = {
  render: () => (
    <AuthLayout>
      <AuthLayoutBrand>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Tesserix Platform</p>
          <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-tight">Secure access for your product teams.</h2>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Unified auth patterns for enterprise workspaces with role-aware controls.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Trusted by operations teams in 28 countries.</p>
      </AuthLayoutBrand>

      <AuthLayoutContent>
        <AuthCard>
          <AuthCardHeader>
            <AuthCardTitle>Sign in</AuthCardTitle>
            <AuthCardDescription>Use your workspace credentials to continue.</AuthCardDescription>
          </AuthCardHeader>
          <form className="space-y-4" aria-label="Sign in form">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@tesserix.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Continue</Button>
          </form>
        </AuthCard>
      </AuthLayoutContent>
    </AuthLayout>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("main")).toBeInTheDocument()
    await expect(canvas.getByRole("heading", { name: /sign in/i })).toBeInTheDocument()
    await expect(canvas.getByRole("form", { name: /sign in form/i })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: /continue/i })).toBeInTheDocument()
  },
}

export const ContentOnly: Story = {
  render: () => (
    <AuthLayout className="lg:grid-cols-1">
      <AuthLayoutContent>
        <AuthCard>
          <AuthCardHeader>
            <AuthCardTitle>Reset password</AuthCardTitle>
            <AuthCardDescription>Enter your email to receive reset instructions.</AuthCardDescription>
          </AuthCardHeader>
          <form className="space-y-4" aria-label="Reset password form">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input id="reset-email" type="email" placeholder="you@tesserix.com" />
            </div>
            <Button className="w-full">Send reset link</Button>
          </form>
        </AuthCard>
      </AuthLayoutContent>
    </AuthLayout>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("main")).toBeInTheDocument()
    await expect(canvas.getByRole("form", { name: /reset password form/i })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: /send reset link/i })).toBeInTheDocument()
  },
}
