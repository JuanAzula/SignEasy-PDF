import { useForm } from 'react-hook-form';
import { TextField, Button, Stack } from '@mui/material';
import { toast } from 'sonner';
import authenticate from '../utils/authenticate';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm({ setDisplayed, setAuthenticated }: any) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response: any = await authenticate(data.email, data.password);
    if (response.status !== 200) {
      toast.error('Wrong username or pin!');
    } else {
      toast.success('Authenticated successfully!');
      setAuthenticated(true);
      setDisplayed(false);
    }
  };

  return (
    <>
      <h1 className="mb-2">Please authenticate to sign.</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Username"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Pin"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;
