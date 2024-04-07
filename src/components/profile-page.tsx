/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/m7KUPipO8sw
 */
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { CreateNewsletter, Newsletter } from './Newsletter';
import db from '@/db';

interface INewsletter {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export async function Profile() {
  const session = await getServerSession();
  if (!session?.user) {
    return redirect('/login');
  }

  const newsletters = await db.newsletter.findMany({
    where: {
      createdBy: {
        email: session.user.email!,
      },
    },
  });

  return (
    <div className='flex flex-col px-4 lg:px-6'>
      <div className='space-y-2 flex justify-center'>
        <div className='flex flex-col items-center py-5 space-x-4'>
          <h1 className='text-4xl capitalize font-bold'>
            {session?.user?.name}
          </h1>
          <p className='text-lg text-gray-500 dark:text-gray-400'>
            Welcome to my newsletter. Here you will find all my latest articles
            and thoughts.
          </p>
        </div>
      </div>
      <div className='container border place-items-center p-5 sm:p-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {newsletters.map((newsletter: INewsletter) => {
          const { id, content, createdAt, title } = newsletter;
          return (
            <Newsletter
              key={id}
              id={id}
              content={content}
              createdAt={createdAt}
              title={title}
            />
          );
        })}

        <CreateNewsletter />
      </div>
    </div>
  );
}
