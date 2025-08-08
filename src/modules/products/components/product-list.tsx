// src/app/products/page.tsx
'use client';

import { useState } from 'react';
import { useGetProductsQuery, useGetCategoriesQuery, useDeleteProductMutation } from '@/redux/api/productsApi';
import Link from 'next/link';
import { debounce } from 'lodash';
import Image from 'next/image';
import Pagination from './pagination';
import DeleteModal from './delete-modal';

export default function ProductListPage() {
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState({
    title: '',
    categoryId: undefined as number | undefined,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const { data: products = [], isLoading, isError } = useGetProductsQuery({
    ...pagination,
    ...filters,
  });

  const { data: categories = [] } = useGetCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleSearchChange = debounce((title: string) => {
    setFilters(prev => ({ ...prev, title }));
    setPagination(prev => ({ ...prev, offset: 0 }));
  }, 500);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setFilters(prev => ({ ...prev, categoryId }));
    setPagination(prev => ({ ...prev, offset: 0 }));
  };

  const handlePageChange = (newOffset: number) => {
    setPagination(prev => ({ ...prev, offset: newOffset }));
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <Link
              href="/products/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Product
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border rounded"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Product List */}
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">Error loading products</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          width={1000}
                          height={1000}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                      <p className="text-gray-600 mb-2">{product.category.name}</p>
                      <p className="font-bold text-blue-600">${product.price}</p>
                      <div className="flex justify-between mt-4">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          View
                        </Link>
                        <div className="flex gap-2">
                          <Link
                            href={`/products/edit/${product.id}`}
                            className="text-yellow-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              setProductToDelete(product.id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  offset={pagination.offset}
                  limit={pagination.limit}
                  total={100} // You might need to adjust this based on API response
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>

        {/* Filters sidebar */}
        <div className="md:w-64">
          <div className="sticky top-4">
            <h2 className="font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className={`w-full text-left px-3 py-2 rounded ${!filters.categoryId ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-3 py-2 rounded ${filters.categoryId === category.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}