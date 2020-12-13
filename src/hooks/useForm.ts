import { useState, useEffect } from 'react'

export type Form<T> = {
  values: T
  errors: ValidationErrors<T>
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export type ValidationErrors<T> = { [field in keyof T]: any } | null

const useForm = <T>(
  initialState: T,
  onSuccess: () => void,
  syncValidator: (values: T) => ValidationErrors<T>
): Form<T> => {
  const [values, setValues] = useState<T>(initialState)
  const [errors, setErrors] = useState<ValidationErrors<T>>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    if (isSubmitting && (!errors || Object.keys(errors).length === 0)) {
      onSuccess()
    }
    setIsSubmitting(false)
  }, [errors, isSubmitting])

  useEffect(() => {
    if (isTouched) {
      setErrors(syncValidator(values))
    }
  }, [values])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (event) event.preventDefault()
    setIsTouched(true)
    setErrors(syncValidator(values))
    setIsSubmitting(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist()
    setIsTouched(true)
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  }
}

export default useForm
