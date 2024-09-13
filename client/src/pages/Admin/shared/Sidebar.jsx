import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full h-[99vh] background bg-bodyColor shadow-xl text-white'>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center justify-between'>
                <Link className='w-full'>
                    <div className='border-b px-5 flex items-center gap-2 text-lg py-2 font-bold-lg group hover:bg-designColor hover:text-white'>
                        Dashboard <LayoutDashboard />
                    </div>
                </Link>

                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Planets 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/planet/list' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        List Planets 
                                    </li>
                                </Link>
                                <Link to='/admin/planet/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Planets 
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-2'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Space Stations 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/student/add' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        View Space Stations
                                    </li>
                                </Link>
                                <Link to='/admin/student/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Space Stations 
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-3'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Products 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/student/add' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        List Products
                                    </li>
                                </Link>
                                <Link to='/admin/student/add' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Products
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-4'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Transactions 
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/student/add' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        View Transactions
                                    </li>
                                </Link>
                                <Link to='/admin/student/add' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Transactions
                                    </li>
                                </Link>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='item-5'>
                        <AccordionTrigger className='group hover:bg-designColor hover:text-black'>
                            <div className='mx-5 flex items-center gap-2'>
                                Orders
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='my-2 flex flex-col items-center justify-center gap-1'>
                                <Link to='/admin/student/add' className='w-full'>
                                    <li className='w-full h-10 flex items-center cursor-pointer justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        View Orders
                                    </li>
                                </Link>
                                <Link to='/admin/student/find' className="w-full">
                                    <li className='w-full h-10 flex items-center justify-center gap-2 group hover:bg-designColor hover:text-black'>
                                        Find Orders
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