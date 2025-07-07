'use client'

import dynamic from 'next/dynamic'
import { forwardRef } from "react"
import { type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor'

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('./InitializedMDXEditor'), {
    // Make sure we turn SSR off
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center p-8 border border-gray-300 rounded-lg bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading editor...</p>
            </div>
        </div>
    )
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) =>
    <Editor {...props} editorRef={ref} />
)

// TS complains without the following line
ForwardRefEditor.displayName = 'ForwardRefEditor' 