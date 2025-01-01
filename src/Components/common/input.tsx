import React from "react";
import { UseFormRegister, FieldValues, RegisterOptions, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>; // Input name must match a valid path in the form schema
  type: string; // Input type (e.g., text, email, password, etc.)
  placeholder?: string; // Optional placeholder
  register: UseFormRegister<T>; // Register function specific to the form schema
  validation?: RegisterOptions<T>; // Validation options for the input
  className?: string; // Optional custom class names
}

const Input = <T extends FieldValues>({
  name,
  type,
  placeholder = "",
  register,
  validation,
  className = "",
}: InputProps<T>) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, validation)} // Properly typed registration
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;
