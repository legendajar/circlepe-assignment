import { useSelector } from 'react-redux';

const LoginDevicesSection = () => {
  const devices = useSelector(store => store.spaceStation.user.device_details)
  return (
    <div className="flex flex-col gap-4 p-4">
        {devices.map((device, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Device {index + 1}</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">OS:</span>
                        <span className="text-gray-800">{device.device_os}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">IP Address:</span>
                        <span className="text-gray-800">{device.device_ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Location:</span>
                        <span className="text-gray-800">{device.device_location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Device Name:</span>
                        <span className="text-gray-800">{device.device_name}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
}

export default LoginDevicesSection