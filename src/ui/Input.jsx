import React from 'react'
import { useForm } from "react-hook-form"

export default function Input({ label, name, type = "text" }) {
  const [value, setValue] = React.useState("");
  const updateData = (e) => {
    if (!value) return;
    setTimeout(() => {
      setValue(e.target.value);
      console.log("Input Value:", value);
    }, 1000);
    return e.target.value;
  }
  const { register, formState: { errors } } = useForm();
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        onChange={(e) => updateData}
        autoComplete="off"
        type={type}
        {...register(name, {
          required: `${label} is required`,
          ...(name === "password" ? { minLength: { value: 8, message: "Minimum 8 characters" } } : {}),
          ...(name === "email" ? { pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } } : {})
        })}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  )
}
