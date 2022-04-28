import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { typeParent, typeChild } from "../../data/categogiesSelect";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addProduct } from "../../api/productsApi";
import { useAddProduct } from "../../hooks/useProductsData";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [selectedParent, setSelectedParent] = React.useState("");
  const [childData, setChildData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: 1,
    typeParent: null,
    typeChild: null,
    countInStock: 1,
    price: 1,
    productImage: [],
    description: null,
  });

  const { mutateAsync: addProduct, isLoading: isLoadingAdd } = useAddProduct();

  const handleChange = (event) => {
    setSelectedParent(event.target.value);
    setFormData({ ...formData, typeParent: event.target.value });

    if (typeChild[event.target.value])
      setChildData(typeChild[event.target.value]);
    else setChildData([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("status", formData.status);
    fd.append("typeParent", formData.typeParent);
    fd.append("typeChild", formData.typeChild);
    fd.append("countInStock", formData.countInStock);
    fd.append("price", formData.price);
    fd.append("description", formData.description);

    for (let i = 0; i < formData.productImage.length; i++) {
      fd.append("productImage", formData.productImage[i]);
    }

    await addProduct(fd);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        className="bg-indigo-500 px-6"
        onClick={() => setOpen(true)}
      >
        Thêm sản phẩm
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex max-w-full overflow-hidden pl-10">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="pointer-events-auto w-screen max-w-3xl">
              <form
                className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                onSubmit={onSubmit}
              >
                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                  <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-white">
                        Thêm sản phẩm
                      </h2>
                      <div className="ml-3 flex h-7 items-center justify-center gap-4">
                        <button
                          type="button"
                          className="bg-primary-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-indigo-300">
                        Bắt đầu bằng cách điền thông tin bên dưới để thêm sản
                        phẩm mớI mới.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-1 flex-col">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 pt-6 pb-5 sm:grid-cols-9">
                        <div className="sm:col-span-7">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên sản phẩm
                          </label>
                          <div className="mt-1">
                            <TextField
                              id="name"
                              name="name"
                              variant="outlined"
                              fullWidth
                              size="small"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Trạng thái
                          </label>
                          <div className="mt-1">
                            <Select
                              id="status"
                              name="status"
                              fullWidth
                              size="small"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  status: e.target.value,
                                })
                              }
                            >
                              <MenuItem value={1}>Còn hàng</MenuItem>
                              <MenuItem value={0}>Hết hàng</MenuItem>
                            </Select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="typeParant"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Loại hàng cha
                          </label>
                          <div className="mt-1">
                            <Select
                              id="typeParent"
                              name="typeParent"
                              fullWidth
                              size="small"
                              value={selectedParent}
                              onChange={handleChange}
                            >
                              {typeParent.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="typeChild"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Loại hàng con
                          </label>
                          <div className="mt-1">
                            <Select
                              id="typeChild"
                              name="typeChild"
                              fullWidth
                              size="small"
                              disabled={childData.length === 0}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  typeChild: e.target.value || null,
                                })
                              }
                            >
                              {childData.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="typeParant"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số lượng
                          </label>
                          <div className="mt-1">
                            <TextField
                              type="number"
                              defaultValue={1}
                              min={1}
                              variant="outlined"
                              fullWidth
                              size="small"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  countInStock: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="typeParant"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giá tiền
                          </label>
                          <div className="mt-1">
                            <TextField
                              type="number"
                              defaultValue={1}
                              min={1}
                              variant="outlined"
                              fullWidth
                              size="small"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  price: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-9">
                          <label className="block text-sm font-medium text-gray-700">
                            Ảnh sản phẩm
                          </label>
                          <div className="mt-1">
                            <input
                              type="file"
                              multiple
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  productImage: e.target.files,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-9">
                          <label
                            htmlFor="typeParant"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Miêu tả sản phẩm
                          </label>
                          <div className="mt-1">
                            <CKEditor
                              editor={ClassicEditor}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData({ ...formData, description: data });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-shrink-0 justify-end gap-4 px-4 py-4">
                  <Button variant="outlined" onClick={() => setOpen(false)}>
                    Huỷ bỏ
                  </Button>
                  <Button type="submit" variant="contained">
                    Thêm
                  </Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>
    </>
  );
};

export default AddProduct;
