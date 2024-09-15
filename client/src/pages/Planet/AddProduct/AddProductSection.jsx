import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from 'axios'
import { PRODUCT_API_END_POINT } from '@/utils/URLS.js'
import { useSelector } from 'react-redux'


const AddProductSection = () => {
    const [input, setInput] = useState({
        name: "",
        price: null,
        quantity: null,
        category: "",  
        description: "",
        file: null
    })
    
    const changeInputHandler = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event
        setInput({
            ...input,
            [name]: value // Dynamically update the specific field
        });
    }

    const categoryHandler = (value) => {
        setInput({
            ...input,
            category: value
        })
    }

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0]
        })
    }

    const { setUser } = useSelector(store => store.planet)
    const submitHandler = async (e) => {
        e.preventDefault();

        console.log('Planet Id: ', setUser._id)
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("price", input.price);
        formData.append("quantity", input.quantity);
        formData.append("category", input.category);
        formData.append("description", input.description);
        formData.append("file", input.file);
        formData.append('id', setUser._id)

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const res = await axios.post(`${PRODUCT_API_END_POINT}/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            if(res.data.success) {
                alert(res.data.message);
                setInput({
                    name: "",
                    price: null,
                    quantity: null,
                    category: "",  
                    description: "",
                    file: null
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className='w-full h-full'>
        <div className='flex flex-col gap-2 m-5 border rounded-md p-3 shadow-md'>
            <h1 className='text-xl font-bold font-titleFonts'> Add Product </h1>
            <form onSubmit={submitHandler}>
                <div className='flex gap-5'>
                    <div className='w-1/2 my-2'>
                        <Label htmlFor='name'>Product Name</Label>
                        <Input name='name' type='text' value={input.name} onChange={changeInputHandler} />
                    </div>
                    <div className='w-1/2 my-2'>
                        <Label htmlFor='category'>Category</Label>
                        <Select onValueChange={categoryHandler}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="shirt">Shirt</SelectItem>
                                <SelectItem value="jeans">Jeans</SelectItem>
                                <SelectItem value="trousers">Trousers</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex flex-col smd:flex-row gap-4'>
                    <div className='w-full smd:w-1/3 my-2'>
                        <Label htmlFor='name'>Product Price</Label>
                        <Input name='price' type='number' value={input.price} onChange={changeInputHandler} />
                    </div>

                    <div className='w-full smd:w-1/3 my-2'>
                        <Label htmlFor='quantity'>Product Quantity</Label>
                        <Input name='quantity' type='number' value={input.quantity} onChange={changeInputHandler} />
                    </div>
                    <div className='w-full smd:w-1/3 my-2'>
                        <Label htmlFor='image'>Product Image</Label>
                        <Input image='name' type='file' accepet='image/*' name='file' onChange={changeFileHandler} />
                    </div>
                </div>
                <div className="my-2">
                    <Label htmlFor='description'>Description</Label>
                    <Textarea name="description" value={input.description} onChange={changeInputHandler} placeholder="Enter Description Here..." />
                </div>

                <Button className='my-5 bg-designColor text-black hover:text-white'>Add Product</Button>
            </form>
        </div>
    </div>
  )
}

export default AddProductSection