import React, {useEffect, useState} from 'react';

const Pulse = ({loadAmount}) => {

  const [isPulse, setIsPulse] = useState([]);

  useEffect(() => {
    for(let i=1; i <= loadAmount; i++){
      setIsPulse(setPrevState => [...setPrevState, i]);
    }
    
  },[loadAmount])

  return (
    <div>
      {isPulse.map((index) => (
        <div key={index}>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <br/>
        </div>
      ))}
    </div>
  )
}

export default Pulse;