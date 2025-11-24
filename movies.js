import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  year: z.number({
    required_error: 'Year is required'
  }).int().min(1800).max(2030),
  rate: z.number()
})

function validate (object) {
  return movieSchema.safeParse(object)
}

function validatePart (object) {
  return movieSchema.partial().safeParse(object)
}

export {
  validate,
  validatePart
}
