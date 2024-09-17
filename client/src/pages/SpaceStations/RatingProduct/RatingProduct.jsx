import Navbar from "../shared/Navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetSingleProduct from "@/hooks/useGetSingleProduct";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "@/utils/URLS.js";

const RatingProduct = () => {
  const params = useParams();
  const id = params.id;
  useGetSingleProduct(id);
  const { singleProduct } = useSelector((store) => store.product);
  const [rating, setRating] = useState({
    star: 0,
    comment: "",
  })

  const navigate = useNavigate()
  const submitHandler = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("rating", rating.star)
    formData.append("comment", rating.comment)

    try {
      const res = await axios.post(`${PRODUCT_API_END_POINT}/comment/add/${singleProduct._id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
  
      if (res.data.success) {
        navigate(`/product/view/${singleProduct._id}`)
        alert(res.data.message)
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-4 border rounded-md border-gray-300 shadow-md p-5">
        <h1 className="text-xl font-bold"> Create Review</h1>
        <div className="flex items-center gap-4 p-2 my-2">
          <Link to={`/product/view/${singleProduct._id}`}>
            <img
              src={singleProduct.image} // Add your image URL here
              alt="Product"
              className="w-16 h-16 object-cover rounded-full border border-gray-200"
            />
          </Link>
          
          <Link to={`/product/view/${singleProduct._id}`}>
            <p className="text-lg font-semibold text-gray-800 capitalize">
              {singleProduct.name}
            </p>
          </Link>
        </div>
        <hr className="my-2" />
        <form onSubmit={submitHandler} className="p-6">
          <div className="mb-4">
            <Label
              htmlFor="rating"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Rating
            </Label>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 cursor-pointer ${
                    index < rating.star
                      ? "fill-current text-yellow-500"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => setRating({
                    ...rating,
                    star: index + 1
                  })}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="comment"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Comment
            </Label>
            <textarea
              id="comment"
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              name='comment'
              value={rating.comment}
              onChange={(e) => setRating({
                ...rating,
                comment: e.target.value
              })}
              placeholder="Write your review here..."
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RatingProduct;
