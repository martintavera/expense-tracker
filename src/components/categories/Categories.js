import React, {useEffect, Fragment} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Pulse from '../loading/Pulse';
import CategoryModal from './CategoryModal';
import GetUser from '../../globalFunctions/GetUser';
import {getCategories, deleteCategory} from '../../actions/categoryActions';

const Categories = () => {
  const user = GetUser();
  const dispatch = useDispatch();

  const {categories, loading} = useSelector(state => state.category);

  useEffect(() => {

    //Get user categories
    if(user.id){
      const all_indicator = 1;
      dispatch(getCategories(user.id,all_indicator));
    }
  },[dispatch, user.id, categories.length])

  const contentLoading = (
    <Fragment>
      <div className="mt-2 w-full sm:w-5/6 md:w-4/5">
        <Pulse loadAmount={categories.length > 1 ? parseInt(categories.length / 2) : 1}/>
      </div>
    </Fragment>
  )

  let contentLoaded = '';

  if(categories.length > 0){
    contentLoaded = (
      <Fragment>
        <div className="mt-2 bg-white w-full sm:w-5/6 md:w-4/5">
          <ul className="rounded-lg w-full divide-y divide-gray-700 divide-opacity-25 text-gray-800">
            {categories.map(({_id, category_name}) => (
                <li key={_id} className="px-4 py-2 flex justify-between font-bold">{category_name}<button type="button" className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold outline-none focus:outline-none" onClick={() => dispatch(deleteCategory(_id))}>X</button></li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  } else {
    contentLoaded = (
      <Fragment>
        <div className="mt-2 bg-gray-300 w-full sm:w-5/6 md:w-4/5">
          <ul className="rounded-lg w-full text-center text-gray-800">
            <li className="px-4 py-2 font-bold">NO RESULTS FOUND</li>
          </ul>
        </div>
      </Fragment>
    )
  }

  return (
    <div>
        <div className="container mx-auto mt-16">
          <div className="flex justify-center">
            <div className="w-full sm:w-5/6 md:w-4/5">
            <CategoryModal/>
            </div>
          </div>
          <div className="flex justify-center item-center">
            {loading === true ? contentLoading : contentLoaded}
          </div>
        </div>
    </div>
  )
}

export default Categories;