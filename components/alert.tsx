import cn from 'classnames'
import Link from 'next/link'

import Container from './util/container'

export default function Alert({ preview }) {
  return (
    <div
      className={cn('border-b z-50 fixed bottom-0 right-0', {
        'border-accent-7 bg-black text-white': preview,
        'border-accent-2 bg-accent-1': !preview,
      })}
    >
      <div className="container">
        <div className="py-2 text-center text-sm">
          {preview && (
            <>
              This page is a preview.{' '}
              <Link
                href="/api/exit-preview"
                className="underline transition-colors duration-200 hover:text-cyan"
              >
                Click here
              </Link>{' '}
              to exit preview mode.
            </>
          )}
        </div>
      </div>
    </div>
  )
}
