import React, { Suspense } from 'react'

function BlogsPage() {
    return (
        <div>BlogsPage</div>
    )
}
export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogsPage />
        </Suspense>
    )
}
