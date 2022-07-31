import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { categories } from "../../data/categories";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { generateLink } from "../../api/productsApi";
import { useAddProductMutation } from "../../services/apiSlice";
import NumberFormat from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
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
      prefix="₫ "
    />
  );
});

const AddProduct = ({ product, setSelectedProduct, refetch }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [childData, setChildData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t("message.validation.required", { field: t("productName") })),
    mainCategory: yup
      .string()
      .required(t("message.validation.required", { field: t("mainCategory") })),
    category: yup
      .string()
      .required(t("message.validation.required", { field: t("category") })),
    subCategory: yup
      .string()
      .required(t("message.validation.required", { field: t("subCategory") })),
    countInStock: yup
      .number()
      .required("message.validation.required", { field: t("countInStock") })
      .typeError(t("message.validation.invalid", { field: t("countInStock") }))
      .min(0, t("message.validation.invalid", { field: t("countInStock") })),
    price: yup
      .number()
      .required("message.validation.required", { field: t("price") })
      .typeError(t("message.validation.invalid", { field: t("price") }))
      .min(0, t("message.validation.invalid", { field: t("price") })),
  });
  const {
    handleSubmit,
    control,
    register,
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
        mainCategory,
        category,
        subCategory,
        countInStock,
        price,
        description,
      } = product;

      setOpen(true);
      setValue("name", name);
      setValue("status", status);
      setValue("mainCategory", mainCategory);
      handleChange(mainCategory);
      setValue("category", category);
      onChangeCategory(category);
      setValue("subCategory", subCategory);
      setValue("countInStock", countInStock);
      setValue("price", price);
      setValue("description", description);
    } else {
      reset();
    }
  }, [product]);

  const handleChange = (value) => {
    const data = categories.find((x) => x.route === value).subCategories;
    setCategory(data);
  };

  const onChangeCategory = (value) => {
    const data = category.find((x) => x.route === value)?.subCategories;
    setSubCategory(data);
  };

  const onSubmit = async (data) => {
    const { name, status, countInStock, mainCategory, subCategory, category, price, description, productImage } =
      data;

    const fd = new FormData();
    fd.append("name", name);
    fd.append("status", status);
    fd.append("mainCategory", mainCategory);
    fd.append("category", category);
    fd.append("subCategory", subCategory);
    fd.append("countInStock", countInStock);
    fd.append("price", price);
    fd.append("description", description);

    for (let i = 0; i < productImage.length; i++) {
      fd.append("productImage", productImage[i]);
    }

    try {
      if (product) {
        await updateProduct(product._id, fd);
        refetch();
        toast.success(t("message.success.update", { field: t("product") }));
      } else {
        await addProduct(fd).unwrap();
        toast.success(t("message.success.add", { field: t("product") }));
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <Button
        variant="contained"
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
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                  <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-white">
                        {product ? "Sửa" : "Thêm"} sản phẩm
                      </h2>
                      <div className="ml-3 flex h-7 items-center justify-center gap-4">
                        <button
                          type="button"
                          className="bg-primary-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => {
                            reset();
                            setOpen(false);
                          }}
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
                      <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 pt-6 pb-5 sm:grid-cols-9">
                        <div className="sm:col-span-7">
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                variant="outlined"
                                size="small"
                                label="Tên sản phẩm"
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
                                size="small"
                                label="Trạng thái"
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
                            name="mainCategory"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                select
                                onChange={(e) => {
                                  onChange(e);
                                  handleChange(e.target.value);
                                }}
                                value={value}
                                variant="outlined"
                                size="small"
                                label={t("mainCategory")}
                                fullWidth
                                error={!!errors.mainCategory}
                                helperText={
                                  errors.mainCategory
                                    ? errors.mainCategory?.message
                                    : ""
                                }
                              >
                                {categories?.map((item) => (
                                  <MenuItem key={item.route} value={item.route}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="category"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                select
                                onChange={(e) => {
                                  onChange(e);
                                  onChangeCategory(e.target.value);
                                }}
                                value={value}
                                variant="outlined"
                                size="small"
                                label={t("category")}
                                fullWidth
                                error={!!errors.category}
                                helperText={
                                  errors.category
                                    ? errors.category?.message
                                    : ""
                                }
                              >
                                {category?.map((item) => (
                                  <MenuItem key={item.route} value={item.route}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="subCategory"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                select
                                variant="outlined"
                                size="small"
                                label={t("subCategory")}
                                fullWidth
                              >
                                {subCategory?.map((item) => (
                                  <MenuItem key={item.href} value={item.href}>
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
                            defaultValue=""
                            render={({ field: { value, onChange } }) => (
                              <NumberFormat
                                value={value}
                                customInput={TextField}
                                thousandSeparator={true}
                                onValueChange={(v) => {
                                  onChange(v.value);
                                }}
                                variant="outlined"
                                size="small"
                                label="Số lượng"
                                error={!!errors.countInStock}
                                helperText={
                                  errors.countInStock
                                    ? errors.countInStock?.message
                                    : ""
                                }
                                fullWidth
                              />
                            )}
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Controller
                            name="price"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                variant="outlined"
                                size="small"
                                label="Giá tiền"
                                InputProps={{
                                  inputComponent: NumberFormatCustom,
                                }}
                                fullWidth
                                error={!!errors.price}
                                helperText={
                                  errors.price ? errors.price?.message : ""
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
                    {t("cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                  >
                    {product ? t("save") : t("confirm")}
                  </LoadingButton>
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
