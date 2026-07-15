const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="relative">
        <div className={`${sizes[size]} rounded-full border-4 border-gray-200`}></div>
        <div className={`absolute inset-0 ${sizes[size]} rounded-full border-4 border-transparent border-t-primary-600 animate-spin`}></div>
      </div>
    </div>
  );
};

export default Spinner;
