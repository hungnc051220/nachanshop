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
    <div className="tw-bg-gray-50">
      <div className="tw-max-w-7xl tw-mx-auto tw-py-10 sm:tw-px-2 lg:tw-px-4 ">
        <div className="tw-max-w-2xl tw-mx-auto tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-10 tw-gap-x-8 lg:tw-max-w-none lg:tw-grid-cols-3">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="tw-text-center sm:tw-flex sm:tw-text-left lg:tw-block lg:tw-text-center"
            >
              <div className="sm:tw-flex-shrink-0">
                <div className="tw-flow-root">
                  <img
                    className="tw-w-28 tw-h-24 tw-mx-auto tw-fill-red-500"
                    src={incentive.imageSrc}
                    alt=""
                  />
                </div>
              </div>
              <div className="tw-mt-3 sm:tw-mt-0 sm:tw-ml-3 lg:tw-mt-3 lg:tw-ml-0">
                <h3 className="tw-text-sm tw-font-medium tw-text-gray-900">
                  {incentive.name}
                </h3>
                <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Incentives;
