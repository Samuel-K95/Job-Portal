interface whiteprop {
  text: string;
}

const WhiteButton = ({ text }: whiteprop) => {
  return (
    <button className="border-[#0034D1] border-1 text-[#0034D1] rounded-lg px-5 py-2 hover:bg-[#0034D1] hover:text-white hover:cursor-pointer">
      {text}
    </button>
  );
};
export default WhiteButton;
