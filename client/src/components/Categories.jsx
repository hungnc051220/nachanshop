import React from "react";
import { useGetProductsQuery } from "../services/apiSlice";
import Category from "./Category";

const Categories = () => {
  const { data: dataCssk, isLoadingCssk } = useGetProductsQuery({
    page: 1,
    type: "cssk",
    limit: 5,
  });

  const { data: dataCsdm, isLoadingCsdm } = useGetProductsQuery({
    page: 1,
    type: "csdm",
    limit: 5,
  });

  const { data: dataMvb, isLoadingMvb } = useGetProductsQuery({
    page: 1,
    type: "mvb",
    limit: 5,
  });

  const { data: dataTpnb, isLoadingTpnb } = useGetProductsQuery({
    page: 1,
    type: "tpnb",
    limit: 5,
  });

  return (
    <section className="mx-auto my-10 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
      <Category
        name="Chăm sóc sức khoẻ"
        icon="shield"
        products={dataCssk?.content}
        link="/products?type=cssk"
        loading={isLoadingCssk}
      />
      <Category
        name="Chăm sóc sắc đẹp"
        icon="lipstick"
        link="/products?type=tpld"
        products={dataCsdm?.content}
        loading={isLoadingCsdm}
      />
      <Category
        name="Mẹ và Bé"
        icon="feeding-bottle"
        link="/products?type=mvb"
        products={dataMvb?.content}
        loading={isLoadingMvb}
      />
      <Category
        name="Thực phẩm Nhật Bản"
        icon="bibimbap"
        link="/products?type=tpnb"
        products={dataTpnb?.content}
        loading={isLoadingTpnb}
      />
    </section>
  );
};

export default Categories;
