import React from "react";
import { useGetProductsQuery } from "../services/apiSlice";
import Category from "./Category";

const Categories = () => {
  const { data: dataCssd, isLoadingCssk } = useGetProductsQuery({
    page: 1,
    mainCategory: "cham-soc-sac-dep",
    limit: 8,
  });

  const { data: dataCssk, isLoadingCsdm } = useGetProductsQuery({
    page: 1,
    mainCategory: "cham-soc-suc-khoe",
    limit: 8,
  });

  const { data: dataMvb, isLoadingMvb } = useGetProductsQuery({
    page: 1,
    mainCategory: "me-be",
    limit: 8,
  });

  const { data: dataTpnb, isLoadingTpnb } = useGetProductsQuery({
    page: 1,
    mainCategory: "thuc-pham",
    limit: 8,
  });

  return (
    <section className="mx-auto my-6 max-w-[1400px] space-y-4 px-4 sm:px-6 lg:px-8 relative">
      <Category
        name="Chăm sóc sắc đẹp"
        icon="lipstick"
        link="/cham-soc-sac-dep"
        products={dataCssd?.content}
        loading={isLoadingCsdm}
        image="cham-soc-sac-dep"
      />
      <Category
        name="Chăm sóc sức khoẻ"
        icon="shield"
        products={dataCssk?.content}
        link="/cham-soc-suc-khoe"
        loading={isLoadingCssk}
        image="cham-soc-suc-khoe"
        reverse={true}
      />
      <Category
        name="Mẹ và Bé"
        icon="feeding-bottle"
        link="/me-be"
        products={dataMvb?.content}
        loading={isLoadingMvb}
        image="me-be"
      />
      <Category
        name="Thực phẩm"
        icon="bibimbap"
        link="/thuc-pham"
        products={dataTpnb?.content}
        loading={isLoadingTpnb}
        image="thuc-pham"
        reverse={true}
      />
    </section>
  );
};

export default Categories;
