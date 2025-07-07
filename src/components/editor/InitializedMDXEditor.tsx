'use client'

import type { ForwardedRef } from 'react'
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    tablePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CreateLink,
    InsertImage,
    InsertTable,
    InsertCodeBlock,
    ListsToggle,
    Separator,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

// Only import this to the next file
export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            plugins={[
                // Core plugins
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),

                // Link support
                linkPlugin(),
                linkDialogPlugin(),

                // Image support
                imagePlugin(),

                // Table support
                tablePlugin(),

                // Code blocks with syntax highlighting
                codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        javascript: 'JavaScript',
                        typescript: 'TypeScript',
                        python: 'Python',
                        html: 'HTML',
                        css: 'CSS',
                        bash: 'Bash',
                        json: 'JSON',
                        markdown: 'Markdown'
                    }
                }),

                // Toolbar with all the controls
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <Separator />
                            <BlockTypeSelect />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <CreateLink />
                            <InsertImage />
                            <Separator />
                            <InsertTable />
                            <InsertCodeBlock />
                        </>
                    )
                })
            ]}
            {...props}
            ref={editorRef}
        />
    )
} 