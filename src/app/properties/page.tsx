import { Suspense } from "react";
import { PropertyFilters } from "@/components/properties/property-filters";
import { SearchHeader } from "@/components/properties/search-header";
import { PropertiesGrid } from "@/components/properties/properties-grid";
import { getProperties } from "@/services/propertyService";
import { Footer } from "@/components/layout/footer";
import PropertiesLoading from "./loading";

async function PropertiesContent({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) {
  const { data: properties, meta } = await getProperties(searchParams);

  return (
    <>
      <Suspense fallback={<div className="h-48 bg-blue-600 animate-pulse" />}>
        <SearchHeader propertiesCount={meta.total} />
      </Suspense>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar Filter - Desktop only */}
          <aside className="hidden md:block w-72 lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-5 text-gray-900">
                Filter
              </h3>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-10 bg-gray-100 rounded animate-pulse"
                      />
                    ))}
                  </div>
                }
              >
                <PropertyFilters />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <PropertiesGrid
              properties={properties || []}
              currentPage={meta.page}
              totalPages={meta.totalPages}
            />
          </main>
        </div>
      </div>
    </>
  );
}

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<PropertiesLoading />}>
        <PropertiesContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </div>
  );
}
