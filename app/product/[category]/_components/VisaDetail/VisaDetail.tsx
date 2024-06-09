import { IVisaDetail } from "@/app/_interface/product.interface";
import { FC } from "react";

interface Props {
  product: IVisaDetail;
}

const VisaDetail: FC<Props> = ({ product }) => {
  return <div className="p-6 flex flex-col gap-8">{product.description}</div>;
};

export default VisaDetail;
