interface checkProp {
  value: string;
}

const CheckInput = ({ value }: checkProp) => {
  return (
    <div className="flex w-full gap-3">
      <input className="text-xl" type="checkbox" value={value} />
      <span>{value}</span>
    </div>
  );
};
export default CheckInput;
