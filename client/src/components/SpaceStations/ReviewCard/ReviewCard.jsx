import React from 'react'

const ReviewCard = ({rating}) => {
  return (
    <div className="flex items-start p-4 bg-white shadow-lg rounded-lg border border-gray-200 mb-4 h-52">
        <img 
            src={rating.userId.image}
            alt={rating.userId.name}
            className='w-12 h-12 rounded-full object-cover mr-4'
        />
        <div className='flex-1'>
            <div className='flex items-center mb-2'>
                <span className="text-lg font-semibold mr-2">{rating.userId.name}</span>
                <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }, (_, index) => (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 ${index < rating.rating ? "fill-current" : "text-gray-300"}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    ))}
                </div>
            </div>
            <p className="text-gray-700 mb-2">{rating.comment}</p>
        </div>
    </div>
  )
}

export default ReviewCard