import Link from "next/link";
import "./TestButton.scss";

type ButtonPropsType = {
  type: "results" | "finalize";
  id: number;
};

export default function TestButton({ type, id }: ButtonPropsType) {
  return (
    <Link href={`/${type}/${id}?from=/dashboard`} className="tb-link-container">
      <button className={`${type} test-button`}>{type}</button>
    </Link>
  );
}
