export type Application = {
  id: number
  company: string
  position: string
  status: 'Applied' | 'Interview' | 'Offer'
}