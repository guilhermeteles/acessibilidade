import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import { Feedback } from '@/components/Feedback'
import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'

export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'

export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col pb-10 pt-16">
      <Prose className="flex-auto">{children}</Prose>
      <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
        <Feedback />
      </footer>
    </article>
  )
}

export const h2 = function H2(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={2} {...props} />
}

function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-blue-500/20 bg-blue-50/50 p-4 leading-6 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/5 dark:text-blue-200 dark:[--tw-prose-links-hover:theme(colors.blue.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-blue-500 stroke-white dark:fill-blue-200/20 dark:stroke-blue-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}



export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({
  children,
  sticky = false,
}: {
  children: React.ReactNode
  sticky?: boolean
}) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

interface PropertiesProps {
  children: React.ReactNode;
  fullWidth?: boolean; // Add a prop to control full width
}

export function Properties({ children, fullWidth = false }: PropertiesProps) {
  return (
    <div className='my-6'>
      <ul
        role="list"
        className={`m-0 ${fullWidth ? 'max-w-full' : 'max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))]'} list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5`}
      >
        {children}
      </ul>
    </div>
  );
}

export function Property({
  name,
  children,
  type,
}: {
  name: string
  children: React.ReactNode
  type?: string
}) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">
              {type}
            </dd>
          </>
        )}
        <dt className="sr-only">Name</dt>
        <dd>
          <code className='bg-transparent'>{name}</code>
        </dd>

        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

export function ImageNote({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string
  imageAlt?: string
}) {
  return (
    <Image
      src={imageSrc || 'https://placehold.co/600x200.png'}
      alt={imageAlt || 'Note image'}
      width={600}  // Adjust the width as needed
      height={200} // Adjust the height as needed
      className="w-full rounded-2xl border border-blue-500/20 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-500/5 dark:text-blue-200 dark:[--tw-prose-links-hover:theme(colors.blue.300)] dark:[--tw-prose-links:theme(colors.white)]"  // Add margin or styling as needed
    />
  )
}

