import { AiOutlineExclamation } from 'react-icons/ai';

interface FormErrorPros {
  message?: string;
}

export const FormError = ({ message }: FormErrorPros) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <AiOutlineExclamation className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
};
