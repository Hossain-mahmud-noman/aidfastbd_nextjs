'use client';
import React, { useState } from 'react'
import { image_base_endpoint } from '../../utils/constants';
import ReviewList from '../ReviewList';
import Image from 'next/image';

function PharmacyTabs({ data }) {
  const [activeTab, setActiveTab] = useState('Info');
  return (

    <>
      <div className="bg-white shadow-md">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start space-x-4 pl-4 pr-4 border-b w-full">
            {['Info', 'Services', 'Drug List', 'Equipments', 'Review'].map(tab => (
              <button
                key={tab}
                className={`text-sm font-semibold whitespace-nowrap p-3 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditionally Render Tab Content */}
      <div className="p-4 mb-[70px]">
        {activeTab === 'Info' && (
          <div>
            {data?.pharmacyAdditionalInfo !== null && <> <h3 className="font-bold text-lg text-black-600">{data?.pharmacyAdditionalInfo.title}</h3>
              <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                {data?.pharmacyAdditionalInfo.details}
              </pre>
              <Image width={1000} height={1000} alt='Image' src={image_base_endpoint + data?.pharmacyAdditionalInfo.imageUrl} /></>}
          </div>
        )}
        {activeTab === 'Services' && (
          <div>
            {data?.pharmacyOtherInfo !== null && <><h3 className="font-bold text-lg text-black-600">{data?.pharmacyAdditionalInfo.title}</h3>
              <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                {data?.pharmacyOtherInfo.details}
              </pre></>}
          </div>
        )}
        {activeTab === 'Drug List' && (
          <div>
            {data?.pharmacyDrugEquipment.length !== 0 && <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Pack Size</th>
                  <th className="py-2 px-4 border-b">Unit Price</th>
                  <th className="py-2 px-4 border-b">Total Taka</th>
                </tr>
              </thead>
              <tbody>
                {data?.pharmacyDrugEquipment.filter(item => item.type === "Drug").map(item => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.packSize}</td>
                    <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                    <td className="py-2 px-4 border-b">{item.totalTaka}</td>
                  </tr>
                ))}
              </tbody>
            </table>}
          </div>
        )}
        {activeTab === 'Equipments' && (
          <div>
            {data?.pharmacyDrugEquipment.length !== 0 &&
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Pack Size</th>
                    <th className="py-2 px-4 border-b">Unit Price</th>
                    <th className="py-2 px-4 border-b">Total Taka</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.pharmacyDrugEquipment.filter(item => item.type === "Equipments").map(item => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.packSize}</td>
                      <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                      <td className="py-2 px-4 border-b">{item.totalTaka}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
          </div>
        )}
        {activeTab === 'Review' && (
          <ReviewList reviews={data?.pharmacyReview} averageRating={data?.averageRating} totalRatings={data?.totalRating} />
        )}
      </div>
    </>
  )
}

export default PharmacyTabs