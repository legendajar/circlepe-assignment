import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BadgeDollarSign, Eclipse, LayoutDashboard, List, Satellite, Search, SearchCheck, ShoppingBag, ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full h-[99vh] background bg-bodyColor shadow-xl text-white'>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center justify-between'>
                <Link to='/admin/dashboard' className='w-full'>
                    <div className='border-b px-5 flex items-center gap-2 text-lg py-2 font-bold-lg group hover:bg-designColor hover:text-white'>
                        <span className='hidden md:inline'>Dashboard</span> <LayoutDashboard />
                    </div>
                </Link>

                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                <span className='hidden md:inline'> Planets</span> <Eclipse />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/planet/list' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>List Planets</span> <List />
                                    </li>
                                </Link>
                                <Link to='/admin/planet/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>Find Planets</span> <Search />
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-2'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                <span className='hidden md:inline'>Space Station</span> <Satellite />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/spacestation/view' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>View Space Stations</span> <List />
                                    </li>
                                </Link>
                                <Link to='/admin/spacestation/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>Find Space Stations</span> <Search /> 
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-3'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                <span className='hidden md:inline'>Products</span> <ShoppingBasket /> 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/product/list' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>List Products</span> <List />
                                    </li>
                                </Link>
                                <Link to='/admin/product/find' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>Find Products</span> <Search />
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-4'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                <span className='hidden md:inline'> Transactions</span> <BadgeDollarSign /> 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/transaction/list' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>View Transactions</span> <List />
                                    </li>
                                </Link>
                                <Link to='/admin/transaction/find' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>Find Transactions</span> <Search />
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-5'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                <span className='hidden md:inline'>Orders</span> <ShoppingBag />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/order/view' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>View Orders</span> <List />
                                    </li>
                                </Link>
                                <Link to='/admin/order/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>Find Orders</span> <Search />
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
  )
}

export default Sidebar