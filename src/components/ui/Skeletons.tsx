export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-2.5 bg-gray-200 rounded w-1/4" />
        <div className="h-3.5 bg-gray-200 rounded w-full" />
        <div className="h-3.5 bg-gray-200 rounded w-3/4" />
        <div className="h-2.5 bg-gray-200 rounded w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          <div className="w-9 h-9 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export function PageBannerSkeleton() {
  return <div className="h-[420px] bg-gray-200 animate-pulse" />
}

export function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-gray-200 h-24 animate-pulse" />
      ))}
    </div>
  )
}

export function SectionSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="h-10 bg-gray-200 animate-pulse rounded" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
      ))}
    </div>
  )
}
