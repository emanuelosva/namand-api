import joi from 'joi'

const MAX_SAFE_LENGHT = 256

const id = joi.string().regex(/[a-zA-Z0-9]{21,21}/)
const name = joi.string().min(2).max(MAX_SAFE_LENGHT)
const email = joi.string().email()
const slug = joi.string().min(2).max(MAX_SAFE_LENGHT)
const currency = joi.string().min(2).max(5)
const password = joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,256}$/)

export const createOne = {
  body: joi.object({
    name: name.required(),
    email: email.required(),
    slug: slug.optional(),
    currency: currency.required(),
    password: password.required(),
  }),
}

export const updateOne = {
  body: joi.object({
    name: name.optional(),
    email: email.optional(),
    slug: slug.optional(),
    currency: currency.optional(),
  }),
}

export const findById = {
  params: joi.object({
    id: id.required(),
  }),
}

export const findBySlug = {
  params: joi.object({
    slug: slug.required(),
  }),
}

export const updatePassword = {
  params: joi.object({ id: id.required() }),
  body: joi.object({
    newPassword: password.required(),
    oldPassword: password.required(),
  }),
}
