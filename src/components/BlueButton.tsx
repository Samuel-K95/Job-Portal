interface blueprop {
  text: string;
}

const BlueButton = ({ text }: blueprop) => {
  return (
    <button className="bg-[#0034D1] border-1 text-white rounded-lg px-5 py-2 hover:bg-white hover:text-[#0034D1] hover:border-[#0034D1] hover:cursor-pointer">
      {text}
    </button>
  );
};
export default BlueButton;
