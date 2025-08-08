// src/app/products/[id]/page.tsx
'use client';

import { useGetProductByIdQuery } from '@/redux/api/productsApi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function ProductDetailsPage() {
    const pathname = usePathname();
    const id = pathname.split('/')[2]
  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const router = useRouter();

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading product</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to products
      </button>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              {product?.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                      width={1000}
                      height={1000}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {product?.category.name}
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-6">${product?.price}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product?.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Additional Images</h2>
              <div className="flex gap-2">
                {product?.images.slice(1).map((image, index) => (
                  <div key={index} className="w-16 h-16 bg-gray-100">
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/products/edit/${product?.id}`}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit Product
              </Link>
              <Link
                href="/products"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}