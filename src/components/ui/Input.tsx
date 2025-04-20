import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-[#ff7f11] focus:border-[#ff7f11] block p-2.5 w-full
          ${error ? 'border-[#ff1b1c]' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#ff1b1c]">{error}</p>}
    </div>
  );
};

export const TextArea: React.FC<
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    className?: string;
  }
> = ({ label, error, fullWidth = false, className = '', id, ...props }) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-[#ff7f11] focus:border-[#ff7f11] block p-2.5 w-full
          ${error ? 'border-[#ff1b1c]' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#ff1b1c]">{error}</p>}
    </div>
  );
};

export const Select: React.FC<
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Array<{ value: string; label: string }>;
    className?: string;
  }
> = ({ label, error, fullWidth = false, options, className = '', id, ...props }) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-[#ff7f11] focus:border-[#ff7f11] block p-2.5 w-full
          ${error ? 'border-[#ff1b1c]' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-[#ff1b1c]">{error}</p>}
    </div>
  );
};

export default Input;