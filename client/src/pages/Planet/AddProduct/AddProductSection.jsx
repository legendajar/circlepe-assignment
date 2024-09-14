import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AddProductSection = () => {
  return (
    <div className='w-full h-full'>
        <div className='flex flex-col gap-2 m-5 border rounded-md p-3 shadow-md'>
            <h1 className='text-xl font-bold font-titleFonts'> Add Product </h1>
            <form>
                <div className='my-2'>
                    <Label htmlFor='name'>Product Name</Label>
                    <Input name='name' type='text' />
                </div>

                <div className='flex gap-4'>
                    <div className='w-1/3 my-2'>
                        <Label htmlFor='name'>Product Price</Label>
                        <Input name='name' type='number' />
                    </div>

                    <div className='w-1/3 my-2'>
                        <Label htmlFor='name'>Product Quantity</Label>
                        <Input name='name' type='number' />
                    </div>
                    <div className='w-1/3 my-2'>
                        <Label htmlFor='name'>Product Image</Label>
                        <Input name='name' type='file' />
                    </div>
                </div>
                <div className="my-2">
                    <Label htmlFor='description'>Description</Label>
                    <Textarea placeholder="Enter Description Here..." />
                </div>

                <Button className='my-5 bg-designColor text-black hover:text-white'>Add Product</Button>
            </form>
        </div>
    </div>
  )
}

export default AddProductSection