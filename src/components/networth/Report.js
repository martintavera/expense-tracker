import React, { Fragment } from 'react';
import Asset from './Asset';
import Liability from './Liability';

const Report = ({asset, liability}) => {

  const assetData = asset.asset;
  const liabilityData = liability.liability;

  const assetSum = assetData.reduce((accu,asset) => {
    return accu + asset.asset_number;
  },0)

  const liabilitySum = liabilityData.reduce((accu,liability) => {
    return accu + liability.liability_number;
  },0)

  const assetTotal = (
    <Fragment>
      <tbody>
        <tr>
          <th colSpan="2" className="text-center py-3 px-5 bg-green-500 font-bold uppercase text-base text-white border-green-800">TOTAL:&nbsp;&nbsp;&nbsp;${parseFloat(assetSum).toFixed(2)}</th>
        </tr>
      </tbody>
    </Fragment>
  )

  const liabilityTotal = (
    <Fragment>
      <tbody>
        <tr>
            <th colSpan="2" className="text-center py-3 px-5 bg-red-500 font-bold uppercase text-base text-white border-red-800">TOTAL:&nbsp;&nbsp;&nbsp;${parseFloat(liabilitySum).toFixed(2)}</th>
        </tr>
      </tbody>
    </Fragment>
  )

  //Networth
  let footerCls = "";
  let difference = parseFloat(assetSum - liabilitySum).toFixed(2);

  difference < 0 ? footerCls = "text-center py-4 px-5 bg-red-700 hover:bg-red-800 font-bold uppercase text-lg text-white border-red-800" : footerCls = "text-center py-4 px-5 bg-green-700 hover:bg-green-800 font-bold uppercase text-lg text-white border-green-800";

  difference = difference < 0 ? `($${Math.abs(difference)})` : `$${difference}`;

  const networthFooter = (
    <Fragment>
      <tfoot>
        <tr>
          <th colSpan="2" className={footerCls}>{difference}</th>
        </tr>
      </tfoot>
    </Fragment>
  )

  return (
    <Fragment>
      <Asset asset={asset} showDelete={1}/>
      {assetTotal}
      <Liability liability={liability} showDelete={1}/>
      {liabilityTotal}
      {networthFooter}
    </Fragment>
  )
}

export default Report;