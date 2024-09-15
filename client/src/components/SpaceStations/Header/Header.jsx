import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Header = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6371b684fec76d85.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6371b684fec76d85.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6371b684fec76d85.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6371b684fec76d85.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
  ];
  return (
    <div className="w-full flex justify-center relative">
      <Carousel
        className="w-full h-[210px] relative shadow-md"
        opts={{
          align: "start",
          loop: true, // Ensure this is supported by your carousel component
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-full">
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-fit"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Centered Previous Button Outside Carousel */}
        <CarouselPrevious className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
          <button className="bg-gray-800 text-white p-2 rounded-full">
            Previous
          </button>
        </CarouselPrevious>

        {/* Centered Next Button Outside Carousel */}
        <CarouselNext className="absolute right-[-40px] top-1/2 transform -translate-y-1/2">
          <button className="bg-gray-800 text-white p-2 rounded-full">
            Next
          </button>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default Header;
