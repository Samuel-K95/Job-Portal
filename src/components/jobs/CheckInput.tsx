// components/jobs/CheckInput.tsx
"use client";

type CheckProps = {
  value: string;
};

const CheckInput = (props: CheckProps) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <input type="checkbox" name={props.value} id={props.value} />
      <label htmlFor={props.value}>{props.value}</label>
    </div>
  );
};
export default CheckInput;
