"use client";
import React, { use } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import CategoryContainer from "../../../views/Category/CategoryContainer";

export default function CategoryPage({ params }) {
  // Resolve params using React.use() in Next 15 App router
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || [];

  const match = {
    params: {
      department: slug.length > 0 && slug[0] !== 'all' ? slug[0] : undefined,
      category: slug.length > 1 ? slug[1] : undefined,
    }
  };

  return (
    <BaseLayout>
      <CategoryContainer match={match} />
    </BaseLayout>
  );
}
