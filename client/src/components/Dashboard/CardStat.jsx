import React from "react";
import { Link } from "react-router-dom";

const CardStat = (props) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500">
                {props.name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {props.amount}
                </div>
              </dd>
            </dl>
          </div>
          <div className="flex-shrink-0">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${props.color}`}
            >
              <props.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <Link
            to={props.href}
            className="font-medium text-indigo-700 hover:text-indigo-900"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardStat;
