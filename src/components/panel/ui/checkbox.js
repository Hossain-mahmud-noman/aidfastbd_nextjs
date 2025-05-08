import * as React from "react";
import { FiCheck } from "react-icons/fi"; 

const Checkbox = React.forwardRef(({ className, checked, onChange, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative inline-flex items-center justify-center h-4 w-4 rounded-sm border border-gray-300 ${checked ? 'bg-primary text-primary-foreground' : 'bg-white'} cursor-pointer ${className}`}
    {...props}
    onClick={e => {
      if (onChange) {
        onChange(!checked);
      }
    }}
  >
    {checked && (
      <FiCheck className="h-4 w-4 text-white" />
    )}
  </div>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
