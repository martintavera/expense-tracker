import React, {Fragment} from 'react';
import {useDispatch} from 'react-redux';
import {deleteAsset} from '../../actions/assetActions';

const Asset = ({asset, showDelete}) => {

  const dispatch = useDispatch();

  const assetData = asset.asset;

  const assetHeaders = (
    <Fragment>
      <thead>
        <tr>
          <th className="text-left py-3 px-5 bg-green-300 font-bold uppercase text-sm text-white border-green-800">Asset Name</th>
          <th className="text-left py-3 px-5 bg-green-300 font-bold uppercase text-sm text-white border-green-800">Value ($)</th>
          {showDelete === 0 ? <th className="text-left py-3 px-5 bg-green-300 font-bold uppercase text-sm text-white border-green-800">&nbsp;</th> : null}
        </tr>
      </thead>
    </Fragment>
  )

  let contentLoaded = '';

  if(assetData.length > 0){
    contentLoaded = (
      <Fragment>
        <tbody>
          {assetData.map(({_id, description_text, asset_number}) => (
            <tr key={_id} className="hover:bg-gray-100">
              <td className="text-left py-2 px-4 border-b border-gray-500">{description_text}</td>
              <td className="text-left py-2 px-4 border-b border-gray-500">${parseFloat(asset_number).toFixed(2)}</td>
              {showDelete === 0 ? <td className="text-left py-2 px-4 border-b border-gray-500"><button className="text-gray-200 font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-700 outline-none focus:outline-none" onClick={() => dispatch(deleteAsset(_id))}>Delete</button></td> : null}
            </tr>
          ))}
        </tbody>
      </Fragment>
    )
  } else {
    contentLoaded = (
      <Fragment>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td colSpan={showDelete === 0 ? 3 : 2} className="text-center py-2 px-4 border-b border-gray-500">NO RECORDS FOUND</td>
          </tr>
        </tbody>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {assetHeaders}
      {contentLoaded}
    </Fragment>
  )
}

export default Asset;