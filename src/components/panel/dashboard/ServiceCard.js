import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronRight } from 'react-icons/fi';


const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  count, 
  className,
  onClick 
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md hover:border-medical-primary ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-medical-light text-medical-primary">
            {icon}
          </div>
          {count !== undefined && (
            <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-medical-primary text-white font-medium">
              {count}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" className="text-medical-primary">
            <span>View</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
