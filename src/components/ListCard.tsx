interface ListCardProps {
  children: React.ReactNode;
  heading: string;
}

export const ListCard: React.FC<ListCardProps> = ({ children, heading }) => {
  return (
    <div key={heading} className="mb-5 border border-base-300 shadow-md p-4 rounded-lg w-full">
      <h2 className="text-sm sm:text-base bg-primary text-primary-content font-bold text-center mb-2 rounded-md">
        {heading}
      </h2>
      <div className="flex flex-wrap pl-7">{children}</div>
    </div>
  );
};
