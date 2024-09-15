import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LayoutDashboard, List, Plus, ShoppingBag, ShoppingBasket } from 'lucide-react'
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
                                <span className='hidden md:inline'>Product</span> <ShoppingBag />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/planet/product/add' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>Add Products</span> <Plus />
                                    </li>
                                </Link>
                                <Link to='/planet/product/view' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>View All Products</span> <List />
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-2'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                <span className='hidden md:inline'>Orders</span> <ShoppingBasket /> 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/planet/order/view' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        <span className='hidden md:inline'>View Orders</span> <List />
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