import { extend } from 'vee-validate';
import { required, email, alpha } from 'vee-validate/dist/rules';

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('alpha', {
    ...alpha,
    message: 'This field is invalid'
});