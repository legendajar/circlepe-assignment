import React from 'react'

const LoginDevicesSection = () => {
  const devices = [
    {
      deviceName: 'MacBook Pro',
      os: 'macOS 13.2',
      ipAddress: '192.168.0.15',
      location: 'New York, USA',
    },
    {
      deviceName: 'iPhone 12',
      os: 'iOS 16.4',
      ipAddress: '192.168.0.100',
      location: 'Los Angeles, USA',
    },
    {
      deviceName: 'Windows PC',
      os: 'Windows 11',
      ipAddress: '192.168.0.22',
      location: 'San Francisco, USA',
    },
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
        {devices.map((device, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Device {index + 1}</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">OS:</span>
                        <span className="text-gray-800">{device.os}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">IP Address:</span>
                        <span className="text-gray-800">{device.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Location:</span>
                        <span className="text-gray-800">{device.location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Device Name:</span>
                        <span className="text-gray-800">{device.deviceName}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
}

export default LoginDevicesSection