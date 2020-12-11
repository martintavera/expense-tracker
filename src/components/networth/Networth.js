import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GetUser from '../../globalFunctions/GetUser';
import {getAssets} from '../../actions/assetActions';
import {getLiabilities} from '../../actions/liabilityActions';
import {clearMessage} from '../../actions/messageActions';
import Pulse from '../loading/Pulse';
import Item from './Item';
import Asset from './Asset';
import Liability from './Liability';
import Report from './Report';

const Networth = () => {

  const user = GetUser();
  const dispatch = useDispatch();
  const asset = useSelector(state => state.asset);
  const liability = useSelector(state => state.liability);

  useEffect(() => {
    if(user.id){
      //Get assets
      dispatch(getAssets(user.id));

      //Get liabilities
      dispatch(getLiabilities(user.id));
    }
  },[dispatch, user.id])

  const [isNetworth, setNetworth] = useState(
    {
      asset : false,
      liability : false,
      report : false
    }
  )

  const onSelect = (text) => (e) => {
    e.preventDefault();

    //Clear Messages
    dispatch(clearMessage());

    const currentState = isNetworth[text];
    let strTextOne = '';
    let strTextTwo = '';

    if(text === 'asset'){
      strTextOne = 'liability';
      strTextTwo = 'report';
    } else if(text === 'liability'){
      strTextOne = 'asset';
      strTextTwo = 'report';
    } else {
      strTextOne = 'asset';
      strTextTwo = 'liability';
    }

    setNetworth(prevState => {
      return {...prevState, [text] : !currentState}
    })

    if(!currentState === true){
      setNetworth(prevState => {
        return {
          ...prevState, 
          [strTextOne] : false, 
          [strTextTwo] : false
        }
      })
    }
  }

  let assetCls = "";
  let liabilityCls = "";
  let reportCls = "";

  isNetworth.asset ? assetCls = "flex-1 text-white bg-green-700 px-5 py-16 m-3 rounded border-2 border-green-700 cursor-pointer" : assetCls = "flex-1 text-gray-800 hover:text-green-700 bg-gray-100 border-2 border-gray-400 hover:border-green-700 px-5 py-16 m-3 rounded cursor-pointer";

  isNetworth.liability ? liabilityCls = "flex-1 text-white bg-red-700 px-5 py-16 m-3 rounded border-2 border-red-700 cursor-pointer" : liabilityCls = "flex-1 text-gray-800 hover:text-red-700 bg-gray-100 border-2 border-gray-400 hover:border-red-700 px-5 py-16 m-3 rounded cursor-pointer";

  isNetworth.report ? reportCls = "flex-1 text-white bg-blue-500 border-2 border-blue-500 px-5 py-16 m-3 rounded cursor-pointer" : reportCls = "flex-1 text-gray-800 hover:text-blue-500 bg-gray-100 border-2 border-gray-400 hover:border-blue-500 px-5 py-16 m-3 rounded cursor-pointer";

  let showContent = '';
  let loadAmount = 0;
  let loadingData = false;

  if(isNetworth.asset){

    showContent = (
      <Fragment>
        <Asset asset={asset} showDelete={0}/>
      </Fragment>
    )
    loadAmount = asset.length;
    loadingData = asset.loading;

  } else if(isNetworth.liability){

    showContent = (
      <Fragment>
        <Liability liability={liability} showDelete={0}/>
      </Fragment>
    )
    loadAmount = liability.length;
    loadingData = liability.loading;

  } else if(isNetworth.report) {
    showContent = (
      <Fragment>
        <Report asset={asset} liability={liability}/>
      </Fragment>
    )
    loadAmount = asset.length + liability.length;
    loadingData = asset.loading || liability.loading;

  } else {
    showContent = null;
    loadAmount = 0;
    loadingData = false;
  }

  let showItem = '';

  if(isNetworth.asset || isNetworth.liability){ //Only show input fields if assets or liabilities is selected
    showItem = (
      <Fragment>
        <Item component_type={isNetworth.asset ? 1 : 2} user_id={user.id}/>
      </Fragment>
    )
  } else {
    showItem = null;
  }

  const contentLoading = (
    <Fragment>
      <div className="flex justify-center mb-0">
        <div className="w-full px-3">
          <Pulse loadAmount={loadAmount > 1 ? parseInt(loadAmount / 2) : 1}/>
        </div>
      </div>
    </Fragment>
  )

  return (
    <div className="container mx-auto mt-12">
      <div className="md:flex w-full md:mb-8 sm:mb-0">
        <div className={assetCls} onClick={onSelect("asset")}>
          <div className="lg:flex justify-center text-center">
            <div className="uppercase tracking-wide text-base font-bold">ASSETS</div>
          </div>
        </div>
        <div className={liabilityCls} onClick={onSelect("liability")}>
          <div className="lg:flex justify-center text-center">
            <div className="uppercase tracking-wide text-sm font-bold">LIABILITIES</div>
          </div>
        </div>
        <div className={reportCls} onClick={onSelect("report")}>
          <div className="lg:flex justify-center text-center">
            <div className="uppercase tracking-wide text-sm font-bold">REPORT</div>
          </div>
        </div>
      </div>
      {
        loadingData ?
        contentLoading
      :
        <Fragment>
          {showItem}
          <div className="flex justify-center mb-0">
            <div className="w-full px-3">
              <div className="mx-auto">
                <div className="bg-white shadow-md rounded">
                  <table className="w-full border-collapse">
                    {showContent}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default Networth;