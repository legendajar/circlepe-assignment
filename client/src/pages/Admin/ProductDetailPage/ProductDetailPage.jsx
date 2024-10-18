import Navbar from '../shared/Navbar'
import ProductDetailPageSection from './ProductDetailPageSection'
import Sidebar from '../shared/Sidebar'

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6 mt-20'>
                <ProductDetailPageSection />
            </div>
        </div>
    </div>
  )
}

export default ProductDetailPage