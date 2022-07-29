import React from "react";
import { useGetProductsQuery } from "../services/apiSlice";
import Category from "./Category";

const Categories = () => {
  const { data: dataCssd, isLoadingCssk } = useGetProductsQuery({
    page: 1,
    mainCategory: "cham-soc-sac-dep",
    limit: 10,
  });

  const { data: dataCssk, isLoadingCsdm } = useGetProductsQuery({
    page: 1,
    mainCategory: "cham-soc-suc-khoe",
    limit: 10,
  });

  const { data: dataMvb, isLoadingMvb } = useGetProductsQuery({
    page: 1,
    mainCategory: "me-be",
    limit: 10,
  });

  const { data: dataTpnb, isLoadingTpnb } = useGetProductsQuery({
    page: 1,
    mainCategory: "thuc-pham",
    limit: 10,
  });

  return (
    <section className="mx-auto my-10 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
      <Category
        name="Chăm sóc sắc đẹp"
        icon="lipstick"
        link="/cham-soc-sac-dep"
        products={dataCssd?.content}
        loading={isLoadingCsdm}
      />
      <Category
        name="Chăm sóc sức khoẻ"
        icon="shield"
        products={dataCssk?.content}
        link="/cham-soc-suc-khoe"
        loading={isLoadingCssk}
      />
      <Category
        name="Mẹ và Bé"
        icon="feeding-bottle"
        link="/me-va-be"
        products={dataMvb?.content}
        loading={isLoadingMvb}
      />
      <Category
        name="Thực phẩm"
        icon="bibimbap"
        link="/thuc-pham"
        products={dataTpnb?.content}
        loading={isLoadingTpnb}
      />
    </section>
  );
};

export default Categories;
