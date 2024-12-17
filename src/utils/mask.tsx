import ReactInputMask from 'react-input-mask';
import { ReactNode } from 'react';
import "../../index"

interface InputMaskProps {
  mask: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maskChar?: string;
}

const MaskedInput: React.FC<InputMaskProps> = ({ mask, value, onChange, maskChar }) => {
  return (
    <ReactInputMask
      mask={mask}
      value={value}
      onChange={onChange}
      maskChar={maskChar || "_"}
    >
      {(inputProps: any) => <input {...inputProps} />}
    </ReactInputMask>
  );
};

export default MaskedInput;
