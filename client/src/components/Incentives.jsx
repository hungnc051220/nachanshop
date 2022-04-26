import React from "react";

const incentives = [
  {
    name: "Miễn phí giao hàng",
    description: "Miễn phí ship cho tất cả đơn hàng giá trị trên 1,000,000đ",
    imageSrc: "/images/icon-delivery-light.svg",
  },
  {
    name: "Đặt hàng nhanh chóng",
    description:
      "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
    imageSrc: "/images/icon-fast-checkout-light.svg",
  },
  {
    name: "Trả hàng",
    description:
      "Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.",
    imageSrc: "/images/icon-returns-light.svg",
  },
];

const Incentives = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl py-10 sm:px-2 lg:px-4 ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 px-4 lg:max-w-none lg:grid-cols-3">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <img
                    className="mx-auto h-24 w-28 fill-red-500"
                    src={incentive.imageSrc}
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {incentive.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Incentives;
