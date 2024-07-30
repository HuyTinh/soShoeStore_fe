import FilterAndSort from "../../components/FilterAndSort";
import ShoeList from "../../components/ShoeList";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from 'framer-motion'
import ShoeCategories from "../../components/ShoeCategories/ShoeCategories";
import { IoReturnUpBackSharp } from "react-icons/io5";

const ShoesPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let page = searchParams.get('page') || 0;
    let size = searchParams.get('size') || 20;
    let sortBy = searchParams.get('sortBy') || '';
    let keyword = searchParams.get('search') || '';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-5 py-10">
            <div className="col-span-5">

                <div className="text-sm breadcrumbs px-20 col-span-2 *:text-xl mb-2 flex gap-x-5">
                    <span className="font-bold underline hover:bg-black hover:text-white flex items-center gap-x-2 cursor-pointer"><IoReturnUpBackSharp />Back</span>
                    <ul>
                        <li><Link className="hover:bg-black hover:text-white px-1 underline" to={'/'}>Home</Link></li>
                        <li><span className="px-1">Shoes</span></li>
                    </ul>
                </div>
                <div className="bg-base-200 relative pb-5 h-64">
                    <div className="bg-white h-2/3 absolute w-full"></div>
                    <div className="px-20 h-full">
                        <ShoeCategories />
                    </div>
                </div>
                <FilterAndSort props={
                    { sortBy, page, size, keyword }
                } />
                <ShoeList props={
                    { sortBy, page, size, keyword }
                } />
            </div>
        </motion.div>
    )
}

export default ShoesPage