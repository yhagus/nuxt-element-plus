import type { ValidationOptions, ValidationRule } from '#imports';
import { createValidationRules } from '#imports';

export function createSignInRule(form: Record<string, unknown>) {
  const definitions: Record<string, ValidationRule[] | { rules: ValidationRule[]; sometimes: (data: Record<string, unknown>) => boolean }> = {
    username: ['required', 'email', 'max:255'],
    password: ['required', 'string', 'min:8', 'max:255'],
  };

  const options: ValidationOptions = {
    attributes: {
      username: 'Email',
      password: 'Password',
    },
    messages: {
      'username.required': 'Email wajib diisi.',
      'username.email': 'Email tidak valid.',
      'password.required': 'Password wajib diisi.',
      'password.min': 'Password minimal 8 karakter.',
    },
  };

  return createValidationRules(definitions, form, options);
}
