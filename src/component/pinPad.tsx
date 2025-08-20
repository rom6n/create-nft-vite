type PinPadProps = {
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  numbers: string;
};

const PinPad = ({ numbers, setNumber }: PinPadProps) => {
  const setNumberFunc = (newNumber: string) => {
    const haveDot = numbers.includes(",");
    const numberNumeric = Number(numbers + newNumber);
    if (numberNumeric > 9999999) {
      setNumber("9999999");
      return;
    } else if ((numbers + newNumber).length > 7) {
      return;
    } else if (
      (numbers === "" && (newNumber === "0" || newNumber === ",")) ||
      (newNumber === "," && haveDot)
    ) {
      return;
    }

    setNumber(numbers + newNumber);
  };
  const delLastNumber = () => {
    const numbersLen = numbers.length;
    const newNumbers = numbers.slice(0, numbersLen - 1);
    setNumber(newNumbers);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-25 gap-y-3">
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("1");
          }}
        >
          1
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("2");
          }}
        >
          2
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("3");
          }}
        >
          3
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("4");
          }}
        >
          4
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("5");
          }}
        >
          5
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("6");
          }}
        >
          6
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("7");
          }}
        >
          7
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("8");
          }}
        >
          8
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc("9");
          }}
        >
          9
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20 "
          onClick={() => {
            setNumberFunc("0");
          }}
        >
          0
        </button>
        <button
          className="w-23 h-18 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
          onClick={() => {
            setNumberFunc(",");
          }}
        >
          ,
        </button>
      </div>
      <button
        className="absolute left-50 w-23 h-18 top-63 bg-white/10 border-4 border-white/40 rounded-xl text-4xl font-bold hover:bg-white/20"
        onClick={() => {
          delLastNumber();
        }}
      >
        {`<-`}
      </button>
    </div>
  );
};

export default PinPad;
