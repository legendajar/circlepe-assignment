import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full h-[99vh] background bg-bodyColor shadow-xl text-white'>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center justify-between'>
                <Link to='/admin/dashboard' className='w-full'>
                    <div className='border-b px-5 flex items-center gap-2 text-lg py-2 font-bold-lg group hover:bg-designColor hover:text-white'>
                        Dashboard <LayoutDashboard />
                    </div>
                </Link>

                <Accordion type='single' collapsible className='w-full'>

                    <AccordionItem value='item-1'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Product 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/planet/product/add' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Add Products
                                    </li>
                                </Link>
                                <Link to='/planet/product/view' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        View All Products 
                                    </li>
                                </Link>
                                <Link to='/admin/planet/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Product
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-2'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Orders 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/spacestation/view' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        View Space Stations
                                    </li>
                                </Link>
                                <Link to='/admin/spacestation/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Space Stations 
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