import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  typeParent,
  typeChild as typesChild,
} from "../../data/categoriesSelect";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { generateLink } from "../../api/productsApi";
import { useAddProduct } from "../../hooks/useProductsData";
import NumberFormat from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProduct } from "../../api/productsApi";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₫"
    />
  );
});

const schema = yup.object().shape({
  name: yup.string().required(),
  typeParent: yup.string().required(),
});

const AddProduct = ({ product, setSelectedProduct }) => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (product) {
      const {
        name,
        status,
        typeParent,
        typeChild,
        countInStock,
        price,
        description,
      } = product;
      setOpen(true);

      setValue("name", name);
      setValue("status", status);
      setValue("typeParent", typeParent);

      if (typesChild[typeParent]) setChildData(typesChild[typeParent]);
      else setChildData([]);

      setValue("typeChild", typeChild);
      setValue("countInStock", countInStock);
      setValue("price", price);
      setValue("description", description);
    } else {
      reset();
    }
  }, [product]);

  const [open, setOpen] = useState(false);
  const [childData, setChildData] = useState([]);
  const [link, setLink] = useState("");

  const [formData, setFormData] = useState({
    nameProduct: "",
    status: 1,
    typeParent: "",
    typeChild: "",
    countInStock: 1,
    price: 1,
    productImage: [],
    description: "",
  });

  const { mutateAsync: addProduct, isLoading: isLoadingAdd } = useAddProduct();

  const handleChange = (event) => {
    if (typesChild[event.target.value])
      setChildData(typesChild[event.target.value]);
    else setChildData([]);
  };

  const getInfo = async () => {
    try {
      const data = await generateLink(link);
      const { title, description } = data;

      setValue("name", title, { shouldValidate: true });
      setValue("description", description);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const {
      name,
      status,
      typeParent,
      typeChild,
      countInStock,
      price,
      description,
      productImage,
    } = data;

    const fd = new FormData();
    fd.append("name", name);
    fd.append("status", status);
    fd.append("typeParent", typeParent);
    fd.append("typeChild", typeChild);
    fd.append("countInStock", countInStock);
    fd.append("price", price);
    fd.append("description", description);

    for (let i = 0; i < productImage.length; i++) {
      fd.append("productImage", productImage[i]);
    }

    if (product) {
      await updateProduct(product._id, fd);
    } else {
      await addProduct(fd);
      reset();
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        className="bg-indigo-500 px-6"
        onClick={() => {
          setSelectedProduct(null);
          setOpen(true);
        }}
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                  <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-white">
                        {product ? "Sửa" : "Thêm"} sản phẩm
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
                        Bắt đầu bằng cách điền thông tin bên dưới để{" "}
                        {product ? "sửa" : "thêm"} sản phẩm.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-1 flex-col">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 pt-6 pb-5 sm:grid-cols-9">
                        {!product && (
                          <>
                            <div className="sm:col-span-7">
                              <TextField
                                id="link"
                                name="link"
                                label="Link sản phẩm từ web Japana"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => setLink(e.target.value)}
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <Button
                                variant="contained"
                                onClick={getInfo}
                                color="warning"
                              >
                                Thêm nhanh
                              </Button>
                            </div>
                          </>
                        )}

                        <div className="sm:col-span-7">
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                variant="outlined"
                                label="Tên sản phẩm"
                                size="small"
                                fullWidth
                                error={!!errors.name}
                                helperText={
                                  errors.name ? errors.name?.message : ""
                                }
                              />
                            )}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Controller
                            name="status"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                select
                                variant="outlined"
                                label="Trạng thái"
                                size="small"
                                fullWidth
                                error={!!errors.status}
                                helperText={
                                  errors.status ? errors.status?.message : ""
                                }
                              >
                                <MenuItem value={1}>Còn hàng</MenuItem>
                                <MenuItem value={0}>Hết hàng</MenuItem>
                              </TextField>
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="typeParent"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                select
                                onChange={(e) => {
                                  onChange(e);
                                  handleChange(e);
                                }}
                                value={value}
                                variant="outlined"
                                label="Loại hàng cha"
                                size="small"
                                fullWidth
                                error={!!errors.typeParent}
                                helperText={
                                  errors.typeParent
                                    ? errors.typeParent?.message
                                    : ""
                                }
                              >
                                {typeParent?.map((item) => (
                                  <MenuItem key={item.value} value={item.value}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="typeChild"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                select
                                variant="outlined"
                                label="Loại hàng con"
                                size="small"
                                fullWidth
                              >
                                {childData?.map((item) => (
                                  <MenuItem key={item.value} value={item.value}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="countInStock"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <TextField
                                type="number"
                                {...field}
                                variant="outlined"
                                label="Số lượng"
                                size="small"
                                fullWidth
                                error={!!errors.countInStock}
                                helperText={
                                  errors.countInStock
                                    ? errors.countInStock?.message
                                    : ""
                                }
                              />
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="price"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                variant="outlined"
                                label="Giá tiền"
                                size="small"
                                InputProps={{
                                  inputComponent: NumberFormatCustom,
                                }}
                                fullWidth
                                error={!!errors.countInStock}
                                helperText={
                                  errors.countInStock
                                    ? errors.countInStock?.message
                                    : ""
                                }
                              />
                            )}
                          />
                        </div>

                        <div className="sm:col-span-9">
                          <label className="block text-sm font-medium text-gray-700">
                            Ảnh sản phẩm
                          </label>
                          <div className="mt-1">
                            <input
                              {...register("productImage")}
                              type="file"
                              multiple
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-9">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Miêu tả sản phẩm
                          </label>
                          <div className="mt-1">
                            <Controller
                              name="description"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <CKEditor
                                  {...field}
                                  data={field.value}
                                  editor={ClassicEditor}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setValue("description", data);
                                  }}
                                />
                              )}
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
                    {product ? "Sửa" : "Thêm"}
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
