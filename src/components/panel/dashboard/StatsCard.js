import React from 'react';
import { Card, CardContent } from '../ui/card';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'; 

const StatsCard = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
            
            {trend && (
              <div className="mt-1 flex items-center text-xs">
                <span
                  className={`font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
                >
                  {trend.isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  {Math.abs(trend.value)}%
                </span>
                <span className="ml-1 text-gray-500">from last month</span>
              </div>
            )}
          </div>
          
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-blue-500">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
