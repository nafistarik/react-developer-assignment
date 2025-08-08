// src/app/products/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation
} from '@/redux/api/productsApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.number().min(1, 'Category is required'),
  images: z.array(z.string().url('Invalid URL')).min(1, 'At least one image is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductFormPage() {
        const pathname = usePathname();
        const id = pathname.split('/')[2]
  const isEdit = id !== 'create';
  const router = useRouter();
  
  const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(
    isEdit ? Number(id) : 0,
    { skip: !isEdit }
  );
  
  const { data: categories = [] } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      categoryId: 0,
      images: [''],
    },
  });

  const [imageUrls, setImageUrls] = useState<string[]>(['']);

  useEffect(() => {
    if (isEdit && product) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: product.images,
      });
      setImageUrls(product.images);
    }
  }, [product, isEdit, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEdit) {
        await updateProduct({
          id: Number(id),
          data: {
            title: data.title,
            price: data.price,
            description: data.description,
            categoryId: data.categoryId,
            images: data.images,
          },
        }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      router.push('/products');
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleAddImage = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleRemoveImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    setValue('images', newImageUrls);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
    setValue('images', newImageUrls);
  };

  if (isProductLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Product' : 'Create Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            {...register('categoryId', { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Images</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="ml-2 px-3 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
          <button
            type="button"
            onClick={handleAddImage}
            className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Add Image
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}