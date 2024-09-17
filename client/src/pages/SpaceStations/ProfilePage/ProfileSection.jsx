import React from 'react'

const ProfileSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-white w-full max-w-4xl mx-auto">
      {/* Profile Photo */}
      <div className="mb-4 md:mb-0 md:mr-8">
        <img 
          src="https://media.licdn.com/dms/image/v2/D5635AQEXXyMIc-erjw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1721546990642?e=1727204400&v=beta&t=NPoDQDG1EbwrsdedWFJxHgmjETldB8QVJuWwIx2G-Eo" 
          alt="User Profile" 
          className="w-40 h-40 object-cover rounded-lg"
        />
      </div>

      {/* User Info */}
      <div className="text-left">
        <h2 className="text-3xl font-semibold mb-4">John Doe</h2>
        <p className="text-gray-600 mb-2"><strong>Mobile:</strong> +12 345678910</p>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> harshsolanki9898@gmail.com</p>
      </div>
    </div>
  )
}

export default ProfileSection