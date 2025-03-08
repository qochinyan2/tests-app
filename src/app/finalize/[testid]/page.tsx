"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Arrow from "../../../../public/assets/Chevron.svg";
import "./finalize.scss";

export default function results() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("from") != "/dashboard") {
      router.push("/dashboard");
    }
  }, [router, searchParams]);

  return (
    <div className="finalize-container">
      <div className="bottom">
        {" "}
        <Link href={"/dashboard"}>
          {" "}
          <Image src={Arrow} alt="<" className="img" />
          <p>Back</p>
        </Link>
      </div>
    </div>
  );
}
