import { postEvent } from "@telegram-apps/sdk-react";
import BackspaceIcon from "../assets/icons/backspaceIcon";

type PinPadProps = {
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  numbers: string;
};

const PinPad = ({ numbers, setNumber }: PinPadProps) => {
  const setNumberFunc = (newNumber: string) => {
    postEvent("web_app_trigger_haptic_feedback", {
      type: "impact",
      impact_style: "soft",
    });

    const haveDot = numbers.includes(".");
    const numberNumeric = Number(numbers + newNumber);
    if (numberNumeric > 9999999) {
      setNumber("9999999");
      return;
    } else if (
      (numbers + newNumber).length > 7 ||
      (numbers.length > 5 && newNumber === ".")
    ) {
      return;
    } else if (numbers === "0" && newNumber !== ".") {
      setNumber(newNumber);
      return;
    } else if (
      (numbers === "0" && newNumber === "0") ||
      (newNumber === "." && haveDot) ||
      (numbers === "0" && newNumber !== ".")
    ) {
      return;
    }

    setNumber(numbers + newNumber);
  };
  const delLastNumber = () => {
    postEvent("web_app_trigger_haptic_feedback", {
      type: "impact",
      impact_style: "soft",
    });

    if (numbers === "0") {
      return;
    } else if (numbers.length === 1) {
      setNumber("0");
      return;
    }
    const numbersLen = numbers.length;
    const newNumbers = numbers.slice(0, numbersLen - 1);
    setNumber(newNumbers);
  };

  return (
    <div>
      <div className="grid grid-cols-3 w-70 h-85 gap-2">
        <button
          className="bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 duration-100 cursor-pointer transition-all active:scale-93"
          onClick={() => {
            setNumberFunc("1");
          }}
        >
          1
        </button>
        <button
          className="  bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("2");
          }}
        >
          2
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("3");
          }}
        >
          3
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("4");
          }}
        >
          4
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("5");
          }}
        >
          5
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("6");
          }}
        >
          6
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("7");
          }}
        >
          7
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("8");
          }}
        >
          8
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("9");
          }}
        >
          9
        </button>
        <button
          className=" bg-white/10 border-1 border-white/40 rounded-3xl text-4xl font-bold hover:bg-white/15 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc("0");
          }}
        >
          0
        </button>
        <button
          className=" bg-gradient-to-bl from-black/20 to-white/3 border-1 border-black/40 rounded-3xl text-4xl font-bold hover:bg-black/10 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            setNumberFunc(".");
          }}
        >
          ,
        </button>
        <button
          className="flex items-center justify-center bg-gradient-to-bl from-black/20 to-white/3 border-1 border-black/40 rounded-3xl text-4xl font-bold hover:bg-black/10 transition-all duration-75 cursor-pointer active:scale-93"
          onClick={() => {
            delLastNumber();
          }}
        >
          <div className="w-10 h-10">
            <BackspaceIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PinPad;
