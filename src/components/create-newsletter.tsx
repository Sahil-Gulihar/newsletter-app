'use client';

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/DFcWFyafMIU
 */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createNewsletter } from '@/actions';
import { useToast } from './ui/use-toast';
import { useEffect, useRef } from 'react';
import { Textarea } from './ui/textarea';
import { CheckCircle2 } from 'lucide-react';

const initialState = {
  error: false,
  message: '',
  description: '',
};

function Errors(props: { errors?: string[] }) {
  if (!props.errors?.length) return null;
  return (
    <div>
      {props.errors.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </div>
  );
}

export function CreateNewsletter({ email }: { email: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createNewsletter, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (!toast) return;
    if (typeof state.message !== 'string') return;

    toast({
      title: state.message,
      description: state.description,
      variant: !state.error ? 'default' : 'destructive',
    });
  }, [state, toast]);

  return (
    <div className='w-full max-w-sm space-y-4 border border-gray-200 rounded-lg p-4'>
      <h3 className='text-2xl font-bold text-center'>
        Create a new newsletter
      </h3>
      <p className='text-sm text-gray-500 dark:text-gray-400 text-center'>
        Create a newsletter expand your voice among millions
      </p>
      <form
        className='grid w-full gap-4'
        ref={formRef}
        action={(payload) => {
          formAction(payload);
          if (state.error) return;
          formRef.current?.reset();
        }}
      >
        <div className='grid w-full gap-0.5'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            name='title'
            placeholder='Enter your title'
            className='mt-1'
          />
        </div>
        <div className='grid w-full gap-0.5'>
          <Label htmlFor='content'>Content</Label>
          <Textarea
            id='content'
            name='content'
            placeholder='Enter your description'
            className='mt-1'
          />
        </div>
        <input type='hidden' value={email} id='email' name='email' />
        <Button className='w-full text-xl font-medium' type='submit'>
          Create <CheckCircle2 className='mx-1' />
        </Button>
      </form>
    </div>
  );
}
