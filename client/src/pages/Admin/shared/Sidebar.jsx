import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import {
    BadgeDollarSign,
    Eclipse,
    LayoutDashboard,
    List,
    Satellite,
    Search,
    ShoppingBag,
    ShoppingBasket,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  
  const Sidebar = () => {
    return (
      <div className="w-1/6 h-[100vh] bg-bodyColor shadow-xl text-white fixed top-16 left-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-start">
            {/* Dashboard Link */}
            <Link to="/admin/dashboard" className="w-full">
              <div className="border-b px-5 py-4 flex items-center gap-2 text-lg font-bold group hover:bg-designColor hover:text-black">
                <LayoutDashboard />
                <span className="hidden md:inline">Dashboard</span>
              </div>
            </Link>
  
            {/* Accordion Section */}
            <Accordion type="single" collapsible className="w-full">
              {/* Planets Section */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="group hover:bg-designColor hover:text-black">
                  <div className="mx-5 flex items-center gap-2">
                    <Eclipse />
                    <span className="hidden md:inline">Planets</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="my-2 flex flex-col items-center justify-center gap-1">
                    <Link to="/admin/planet/list" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <List />
                        <span className="hidden md:inline">List Planets</span>
                      </li>
                    </Link>
                    <Link to="/admin/planet/find" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <Search />
                        <span className="hidden md:inline">Find Planets</span>
                      </li>
                    </Link>
                  </ul>
                </AccordionContent>
              </AccordionItem>
  
              {/* Space Station Section */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="group hover:bg-designColor hover:text-black">
                  <div className="mx-5 flex items-center gap-2">
                    <Satellite />
                    <span className="hidden md:inline">Space Station</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="my-2 flex flex-col items-center justify-center gap-1">
                    <Link to="/admin/spacestation/view" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <List />
                        <span className="hidden md:inline">View Space Stations</span>
                      </li>
                    </Link>
                    <Link to="/admin/spacestation/find" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <Search />
                        <span className="hidden md:inline">Find Space Stations</span>
                      </li>
                    </Link>
                  </ul>
                </AccordionContent>
              </AccordionItem>
  
              {/* Products Section */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="group hover:bg-designColor hover:text-black">
                  <div className="mx-5 flex items-center gap-2">
                    <ShoppingBasket />
                    <span className="hidden md:inline">Products</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="my-2 flex flex-col items-center justify-center gap-1">
                    <Link to="/admin/product/list" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <List />
                        <span className="hidden md:inline">List Products</span>
                      </li>
                    </Link>
                    <Link to="/admin/product/find" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <Search />
                        <span className="hidden md:inline">Find Products</span>
                      </li>
                    </Link>
                  </ul>
                </AccordionContent>
              </AccordionItem>
  
              {/* Transactions Section */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="group hover:bg-designColor hover:text-black">
                  <div className="mx-5 flex items-center gap-2">
                    <BadgeDollarSign />
                    <span className="hidden md:inline">Transactions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="my-2 flex flex-col items-center justify-center gap-1">
                    <Link to="/admin/transaction/list" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <List />
                        <span className="hidden md:inline">View Transactions</span>
                      </li>
                    </Link>
                    <Link to="/admin/transaction/find" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <Search />
                        <span className="hidden md:inline">Find Transactions</span>
                      </li>
                    </Link>
                  </ul>
                </AccordionContent>
              </AccordionItem>
  
              {/* Orders Section */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="group hover:bg-designColor hover:text-black">
                  <div className="mx-5 flex items-center gap-2">
                    <ShoppingBag />
                    <span className="hidden md:inline">Orders</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="my-2 flex flex-col items-center justify-center gap-1">
                    <Link to="/admin/order/view" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <List />
                        <span className="hidden md:inline">View Orders</span>
                      </li>
                    </Link>
                    <Link to="/admin/order/find" className="w-full">
                      <li className="w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black">
                        <Search />
                        <span className="hidden md:inline">Find Orders</span>
                      </li>
                    </Link>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  