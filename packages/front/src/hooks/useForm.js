import { useState } from 'react'

const useForm = data => {
  const [values, setValues] = useState(data)

  const handleChange = event => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value.replace(/\s/g, '')
    }))
  }

  return [values, handleChange]
}

export default useForm
