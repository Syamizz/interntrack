import type { Meta, StoryObj } from '@storybook/react-vite'
import ApplicationCard from './ApplicationCard'
import { expect, fn, userEvent, within } from 'storybook/test'

const meta = {
    title: 'InternTrack/ApplicationCard',
    component: ApplicationCard,

    //args
    argTypes: {
        status: {
            control: 'select',
            options: ['Applied', 'Interview', 'Offer'],
        },
    },
} satisfies Meta<typeof ApplicationCard>

export default meta

type Story = StoryObj<typeof meta>

//applied
export const Applied: Story = {
  args: {
    id: 1,
    company: 'Google',
    position: 'Software Engineer Intern',
    status: 'Applied',
    onEdit: fn(),
    onDelete: fn(),
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getByRole('button', { name: /edit/i })
    )

    await expect(args.onEdit).toHaveBeenCalledTimes(1)
  },
}

//interview
export const Interview: Story = {
    args: {
        id: 2,
        company: 'Shopee',
        position: 'Frontend Intern',
        status: 'Interview',
        onEdit: () => { },
        onDelete: () => { },
    },
}

//offer
export const Offer: Story = {
    args: {
        id: 3,
        company: 'Microsoft',
        position: 'Software Engineer Intern',
        status: 'Offer',
        onEdit: () => { },
        onDelete: () => { },
    },
}

//delete
export const DeleteInteraction: Story = {
  args: {
    id: 4,
    company: 'Netflix',
    position: 'Frontend Intern',
    status: 'Applied',
    onEdit: fn(),
    onDelete: fn(),
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getByRole('button', { name: /delete/i })
    )

    await expect(args.onDelete).toHaveBeenCalledTimes(1)
  },
}