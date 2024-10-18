import useGetSingleProduct from '@/hooks/useGetSingleProduct';
import { StarIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductDetailPageSection = () => {
    const params = useParams();
    const id = params.id;
    useGetSingleProduct(id)
    const product = useSelector(store => store.product.singleProduct)

    const calcAverageRating = (ratings) => {
        // Check if ratings array exists and has valid entries
        if (!ratings || ratings.length === 0) return "No Rating"; // No ratings, return "No Rating"
      
        // Calculate total rating
        const totalRating = ratings.reduce((sum, ratingObj) => {
          const rating = Number(ratingObj.rating); // Convert rating to number (ensure it's numeric)
          return sum + (isNaN(rating) ? 0 : rating); // If rating is NaN, treat it as 0
        }, 0);
      
        // Calculate average rating
        const averageRating = totalRating / ratings.length;
      
        // If the average rating is less than 1, return "No Rating"
        if (averageRating < 1) return "No Rating";
      
        return averageRating.toFixed(2); // Round the rating to two decimal places if it's 1 or more
    };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-100">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Product Details - Admin</h1>

      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Product ID: <span className="text-gray-900">{product._id}</span>
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Total Stock: <span className="text-gray-900">{product.stock}</span>
          </p>
          <p className="text-lg font-medium text-gray-700 mb-6">
            Description:{" "}
            <span className="text-gray-900">{product.description}</span>
          </p>

          {/* Average Rating */}
          <div className="flex items-center">
            <StarIcon className="text-yellow-500 w-6 h-6 mr-2" />
            <p>Average Rating: {calcAverageRating(product.ratings) === "No Rating" 
       ? "No Rating" 
       : `${calcAverageRating(product.ratings)} / 5`}
    </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageSection;
