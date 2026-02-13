import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card'

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The controlled value of the active tab',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default active tab (uncontrolled)',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when the active tab changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Navigation</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Tabs Showcase</h2>
          <p className="text-sm text-muted-foreground">Tabbed navigation for organizing content.</p>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Account Information</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings and preferences here.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Password Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Update your password and security settings.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your application preferences.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-card-foreground">With Cards</h3>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                      View a summary of your dashboard metrics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Your overview content goes here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>
                      Detailed analytics and insights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Your analytics data goes here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>
                      Generate and view reports.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Your reports go here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
}
