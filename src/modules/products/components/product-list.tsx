"use client";

import { useState } from "react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useDeleteProductMutation,
} from "@/redux/api/productsApi";
import Link from "next/link";
import { debounce } from "lodash";
import Image from "next/image";
import Pagination from "./pagination";
import DeleteModal from "./delete-modal";

export default function ProductListPage() {
  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });
  const [filters, setFilters] = useState({
    title: "",
    categoryId: undefined as number | undefined,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery({
    ...pagination,
    ...filters,
  });

  const { data: categories = [] } = useGetCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleSearchChange = debounce((title: string) => {
    setFilters((prev) => ({ ...prev, title }));
    setPagination((prev) => ({ ...prev, offset: 0 }));
  }, 500);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setFilters((prev) => ({ ...prev, categoryId }));
    setPagination((prev) => ({ ...prev, offset: 0 }));
  };

  const handlePageChange = (newOffset: number) => {
    setPagination((prev) => ({ ...prev, offset: newOffset }));
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <Link
              href="/products/create"
              className="px-4 py-2 rounded-lg bg-primary text-[var(--primary-foreground)] font-medium hover:bg-[var(--primary-hover)] transition-base"
            >
              Add Product
            </Link>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-base"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Product List */}
          {isLoading ? (
            <div className="text-center py-12 text-[var(--muted-foreground)]">
              Loading...
            </div>
          ) : isError ? (
            <div className="text-center py-12 bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-lg">
              Error loading products
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-sm hover:shadow-md transition-base"
                  >
                    <div className="h-48 bg-[var(--muted)] flex items-center justify-center overflow-hidden">
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
                    <div className="p-5">
                      <h3 className="font-semibold text-lg leading-snug mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] mb-3">
                        {product.category.name}
                      </p>
                      <p className="font-bold text-[var(--primary)] text-lg">
                        ${product.price}
                      </p>
                      <div className="flex justify-between items-center mt-5 text-sm font-medium">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-[var(--primary)] hover:underline"
                        >
                          View
                        </Link>
                        <div className="flex gap-3">
                          <Link
                            href={`/products/edit/${product.id}`}
                            className="text-[var(--muted-foreground)] hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              setProductToDelete(product.id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-[var(--destructive)] hover:underline"
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
              <div className="mt-10">
                <Pagination
                  offset={pagination.offset}
                  limit={pagination.limit}
                  total={100}
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>

        {/* Filters sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <h2 className="font-bold text-lg mb-5">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-base ${
                    !filters.categoryId
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "hover:bg-[var(--muted)]"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-base ${
                      filters.categoryId === category.id
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "hover:bg-[var(--muted)]"
                    }`}
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
