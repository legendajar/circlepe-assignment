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
    "https://images.unsplash.com/photo-1600188669346-7ed12c8d776a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhY2tncm91bmR8ZW58MHx8fDE2MDk5ODU5MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1600188669576-325b58c5cb68?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhY2tncm91bmR8ZW58MHx8fDE2MDk5ODU5MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1600188669781-006fc5f60d44?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhY2tncm91bmR8ZW58MHx8fDE2MDk5ODU5MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1600188669935-2f5c8b287e62?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhY2tncm91bmR8ZW58MHx8fDE2MDk5ODU5MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1600188669657-f7b26aab65cf?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhY2tncm91bmR8ZW58MHx8fDE2MDk5ODU5MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1600188669834-6e03a9e1c3a7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhY2tncm91bmR8ZW58MHx8fDE2MDk5ODU5MzI&ixlib=rb-1.2.1&q=80&w=400",
  ];
  return (
    <div className="w-full flex justify-center relative">
      <Carousel
        className="w-full h-[350px] relative"
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
                  className="w-full h-full object-cover"
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
