"use client";
import React from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import SingleProductContainer from "../../../views/Product/SingleProductContainer";
import { usePathname } from "next/navigation";

export default function SingleProductPage() {
  const pathname = usePathname();
  const productId = pathname.split("/").slice(-1)[0];

  return (
    <BaseLayout>
      <SingleProductContainer productId={productId} />
    </BaseLayout>
  );
}
