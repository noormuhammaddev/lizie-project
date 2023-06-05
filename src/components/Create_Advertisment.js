import React, { useState, useEffect } from "react";
import "./create_advertisment.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Create_Advertisment = (props) => {
  const [checkPets, setCheckPets] = useState(false);
  const [checkCommonAreas, setCheckCommonAreas] = useState(false);
  const [checkYard, setCheckYard] = useState(false);
  const [checkPool, setCheckPool] = useState(false);
  const [checkGarden, setCheckGarden] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages1, setSelectedImages1] = useState([]);

  useEffect(() => {
    console.log("change");
    if (props?.row_data?.images) {
      setSelectedImages1([...selectedImages1, ...props.row_data.images]);
      setSelectedImages([...selectedImages, ...props.row_data.images]);
    }
    if (
      props?.row_data?.additional &&
      props.row_data.additional.includes("pets")
    ) {
      setCheckPets(true);
    }
    if (
      props?.row_data?.additional &&
      props.row_data.additional.includes("commonAreas")
    ) {
      setCheckCommonAreas(true);
    }
    if (
      props?.row_data?.additional &&
      props.row_data.additional.includes("yard")
    ) {
      setCheckYard(true);
    }
    if (
      props?.row_data?.additional &&
      props.row_data.additional.includes("pool")
    ) {
      setCheckPool(true);
    }
    if (
      props?.row_data?.additional &&
      props.row_data.additional.includes("garden")
    ) {
      setCheckGarden(true);
    }
  }, []);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files);
    setSelectedImages([...selectedImages, ...files]);
    console.log(selectedImages);
  };

  const formik = useFormik({
    initialValues: {
      title: props.row_data.title ? props.row_data.title : "",
      address: props.row_data.address ? props.row_data.address : "",
      property: props.row_data.property ? props.row_data.property : "",
      rent: props.row_data.rent ? props.row_data.rent : "",
      maintenance: props.row_data.maintenance ? props.row_data.maintenance : "",
      rooms: props.row_data.rooms ? props.row_data.rooms : "",
      area: props.row_data.area ? props.row_data.area : "",
      bathrooms: props.row_data.bathrooms ? props.row_data.bathrooms : "",
      parking: props.row_data.parking ? props.row_data.parking : "",
      description: props.row_data.description ? props.row_data.description : "",
      additional: props.row_data.additional ? props.row_data.additional : [],
      distrito: props.row_data.distrito ? props.row_data.distrito : "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("title is required")
        .matches(/^[a-zA-Z ]+$/),
      address: Yup.string().required("address is required"),
      property: Yup.string()
        .matches(/^[a-zA-Z ]+$/)
        .required(),
      rent: Yup.number().required("rent have must"),
      maintenance: Yup.number().required("maintenance should must be enter"),
      rooms: Yup.number().required("Enter rooms"),
      area: Yup.number().required("Enter area"),
      bathrooms: Yup.number().required("Enter both"),
      parking: Yup.number().required("Enter parking "),
      distrito: Yup.string().required("distrito is required"),
      description: Yup.string().required("Please write some description"),
      additional: Yup.array()
        .of(
          Yup.string().oneOf(["pool", "yard", "garden", "pets", "commonAreas"])
        )
        .min(1, "At least one checkbox must be checked."),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("values", JSON.stringify(values));
      formData.append("selectedImages1", JSON.stringify(selectedImages1));
      selectedImages.forEach((image, index) => {
        formData.append("selectedImages", image);
        console.log(image);
      });
      if (props.row_data.length !== 0) {
        formData.append("propId", JSON.stringify(props.row_data));
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/editSubmit`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // Handle response
            console.log(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      } else {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/database`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // Handle response
            console.log(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }
      props.modalClose();
      toast.success("Successfully submited!");
      setTimeout(() => {
        window.location.reload() // Show a success toast message
      }, 2000);
    },
  });
  function hide(index) {
    console.log(index);
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.src !== index)
    );
  }

  return (
    <>
      <ToastContainer />
      <div className=" w-[100%] overflow-hidden h-full rounded">
        <div className="bg-[#F2EBE3] w-full h-[85px] py-[24px] px-[24px] ">
          <span className="text-[28px] font-[500]">Crear Anuncio</span>
        </div>

        <form onSubmit={formik.handleSubmit} className="py-[24px] px-[24px]">
          <h3 className="font-[500] pb-[16px] text-[20px] text-[#323232]">
            Detalles de la propiedad
          </h3>
          <div className="flex gap-[32px] items-center">
            <div className="left flex-1">
              <div className="block relative">
                <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                  Título
                </label>
                <input
                  className="block mb-[16px] md:w-[460px] w-[324px]  border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                  placeholder="Hermoso apartamento en el centro de lima"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  name="title"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-[red]  absolute top-[65px] right-[10px] text-[12px] px-[10px] py-[5px] rounded-[8px]">
                    {formik.errors.title}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-[16px] md:flex-row flex-col">
                <div className="block relative">
                  <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="block mb-[16px] md:w-[222px] w-[324px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    placeholder="Enter"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    name="address"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-[red]  absolute top-[65px] right-[10px] text-[12px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.address}
                    </div>
                  ) : null}
                </div>
                <div className="block relative">
                  <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Propiedad
                  </label>
                  <select
                    className="block mb-[16px] md:w-[222px] w-[324px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    name="property"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.property}
                    placeholder="Enter"
                  >
                    <option disabled value="" className="bg-gray-300">
                      Propiedad
                    </option>
                    <option value="casa">casa</option>
                    <option value="departamento">department</option>
                  </select>
                  {formik.touched.property && formik.errors.property ? (
                    <div className="error1">{formik.errors.property}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-[16px]">
                <div className="block relative">
                  <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Alquiler
                  </label>
                  <input
                    type="number"
                    className="block mb-[16px] md:w-[222px] w-[163px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    placeholder="Enter"
                    name="rent"
                    value={formik.values.rent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.rent && formik.errors.rent ? (
                    <div className="text-[red]  absolute top-[65px] right-[10px] text-[11px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.rent}
                    </div>
                  ) : null}
                </div>
                <div className="block relative">
                  <label className="block  text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Mantenimiento
                  </label>
                  <input
                    className="block mb-[16px] md:w-[222px] w-[163px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    placeholder="Enter"
                    type="number"
                    value={formik.values.maintenance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="maintenance"
                  />
                  {formik.touched.maintenance && formik.errors.maintenance ? (
                    <div className="text-[red]  absolute top-[65px] right-[5px] text-[11px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.maintenance}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-[16px]  flex-wrap md:flex-nowrap">
                <div className="block relative">
                  <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Cuartos
                  </label>
                  <input
                    placeholder="2"
                    className="block mb-[16px] md:w-[103px] w-[163px]  border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    type="number"
                    value={formik.values.rooms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="rooms"
                  />
                  {formik.touched.rooms && formik.errors.rooms ? (
                    <div className="text-[red]  absolute top-[65px] right-[10px] text-[11px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.rooms}
                    </div>
                  ) : null}
                </div>

                <div className="block relative">
                  <label className="block  text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Área
                  </label>
                  <input
                    type="number"
                    placeholder="3"
                    className="block mb-[16px] md:w-[103px] w-[163px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    name="area"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.area && formik.errors.area ? (
                    <div className="text-[red]  absolute top-[65px] right-[10px] text-[11px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.area}
                    </div>
                  ) : null}
                </div>

                <div className="block relative">
                  <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Baños
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="2"
                    className="block mb-[16px] md:w-[103px] w-[163px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    value={formik.values.bathrooms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bathrooms && formik.errors.bathrooms ? (
                    <div className="text-[red]  absolute top-[65px] right-[10px] text-[11px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.bathrooms}
                    </div>
                  ) : null}
                </div>

                <div className="block relative">
                  <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                    Parqueo
                  </label>
                  <input
                    name="parking"
                    placeholder="4"
                    className="block mb-[16px] md:w-[103px] w-[163px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                    value={formik.values.parking}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.parking && formik.errors.parking ? (
                    <div className="text-[red]  absolute top-[65px] right-[5px] text-[11px] px-[10px] py-[5px] rounded-[8px]">
                      {formik.errors.parking}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="block relative">
                <label className="block text-[16px] font-[500] text-[#585858] pb-[8px]">
                  Distrito
                </label>
                <select
                  name="distrito"
                  placeholder="4"
                  className="block mb-[16px] md:w-[103px] lg:w-[222px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] pl-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                  value={formik.values.distrito}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option disabled className="bg-gray-300" value="">
                    Districto
                  </option>
                  <option value="miraflores">miraflower</option>
                  <option value="sanIsidro">San Isidro</option>
                  <option value="surco">Surco</option>
                  <option value="laMolina">La monila</option>
                  <option value="barranco">Barranco</option>
                </select>
                {formik.touched.distrito && formik.errors.distrito ? (
                  <div className="text-[red]  absolute top-[65px]  text-[11px] px-[10px] py-[5px] rounded-[8px]">
                    {formik.errors.distrito}
                  </div>
                ) : null}
              </div>

              <h3 className="text-[16px] font-[500] text-[ #585858] mt-[16px] pb-[11px]">
                Adicionales
              </h3>
              <div className="">
                <div className="flex items-center md:gap-[70px] gap-[30px] pb-[15px]">
                  <div className="flex items-center gap-[8px]">
                    {/* props.row_data.additional.includes("pets") ? check : false */}
                    <input
                      type="checkbox"
                      id="mascotas"
                      className="w-[16px]"
                      name="additional"
                      value={"pets"}
                      onClick={() => setCheckPets(!checkPets)}
                      onChange={() =>
                        formik.setFieldValue(
                          "additional",
                          formik.values.additional.includes("pets")
                            ? formik.values.additional.filter(
                                (cb) => cb !== "pets"
                              )
                            : [...formik.values.additional, "pets"]
                        )
                      }
                      checked={checkPets}
                    />
                    <label
                      htmlFor="mascotas"
                      className=" text-[16px] font-[500] text-[#585858]"
                    >
                      Mascotas
                    </label>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="checkbox"
                      id="jardín"
                      className="w-[15px]"
                      name="additional"
                      value={"garden"}
                      onClick={() => setCheckGarden(!checkGarden)}
                      checked={checkGarden}
                      onChange={() =>
                        formik.setFieldValue(
                          "additional",
                          formik.values.additional.includes("garden")
                            ? formik.values.additional.filter(
                                (cb) => cb !== "garden"
                              )
                            : [...formik.values.additional, "garden"]
                        )
                      }
                    />
                    <label
                      htmlFor="jardín"
                      className=" text-[16px] font-[500] text-[#585858]"
                    >
                      Jardín
                    </label>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="checkbox"
                      className="w-[15px]"
                      name="additional"
                      id="patio"
                      value={"yard"}
                      // checked={
                      //   props?.row_data?.additional?.length === 0
                      //     ? false
                      //     : (props?.row_data?.additional?.includes("yard")
                      //         ? check
                      //         : false) || false
                      // }
                      // onClick={() => setCheck(!check)}
                      onClick={() => setCheckYard(!checkYard)}
                      checked={checkYard}
                      onChange={() =>
                        formik.setFieldValue(
                          "additional",
                          formik.values.additional.includes("yard")
                            ? formik.values.additional.filter(
                                (cb) => cb !== "yard"
                              )
                            : [...formik.values.additional, "yard"]
                        )
                      }
                    />
                    <label
                      htmlFor="patio"
                      className=" text-[16px] font-[500] text-[#585858]"
                    >
                      Patio
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-[70px]">
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="checkbox"
                      className="w-[16px]"
                      name="additional"
                      // checked={
                      //   props?.row_data?.additional?.length === 0
                      //     ? false
                      //     : (props?.row_data?.additional?.includes("pool")
                      //         ? check
                      //         : false) || false
                      // }
                      // onClick={() => setCheck(!check)}
                      onClick={() => setCheckPool(!checkPool)}
                      checked={checkPool}
                      value={"pool"}
                      id="piscina"
                      onChange={() =>
                        formik.setFieldValue(
                          "additional",
                          formik.values.additional.includes("pool")
                            ? formik.values.additional.filter(
                                (cb) => cb !== "pool"
                              )
                            : [...formik.values.additional, "pool"]
                        )
                      }
                    />
                    <label
                      htmlFor="piscina"
                      className=" text-[16px] font-[500] text-[#585858]"
                    >
                      Piscina
                    </label>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="checkbox"
                      className="w-[16px]"
                      name="additional"
                      id="areasComunes"
                      value={"commonAreas"}
                      onClick={() => setCheckCommonAreas(!checkCommonAreas)}
                      checked={checkCommonAreas}
                      onChange={() =>
                        formik.setFieldValue(
                          "additional",
                          formik.values.additional.includes("commonAreas")
                            ? formik.values.additional.filter(
                                (cb) => cb !== "commonAreas"
                              )
                            : [...formik.values.additional, "commonAreas"]
                        )
                      }
                    />
                    <label
                      htmlFor="areasComunes"
                      className=" text-[16px] font-[500] text-[#585858]"
                    >
                      Áreas comunes
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="right flex-1 hidden md:block">
              <label className="block text-[16px] font-[500] text-[#585858] pb-[8px] ">
                Descripción
              </label>
              <textarea
                className="block h-[400px] w-[400px] scrollbar-thumb-red-500 overflow-y-scroll scrollbar-track-red-800 h-[443px] border-[1px] border-solid border-[#E6E7ED] rounded-[8px] py-[10px] px-[16px] placeholder:text-[#808080] text-[14px] font-[400]"
                name="description"
                value={formik.values.description}
                placeholder="Enter your data here ..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500">{formik.errors.description}</div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between  mt-[20px]">
            <h3 className="text-[20px] font-[500] text-[#323232] pb-[16px]">
              Subir Fotos
            </h3>
          </div>

          <div className="flex">
            <div className="flex">
              {selectedImages.map((image, index) => {
                const abc = image.imageUrl
                  ? `${process.env.REACT_APP_BASE_URL}${image.imageUrl}`
                  : URL.createObjectURL(image);
                return (
                  <img
                    key={index}
                    src={abc}
                    alt="Selected"
                    className="w-16 h-16 rounded-[8px] m-[10px]"
                    id="hideImge"
                    onClick={() => hide(index)}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-start">
              <label
                for="dropzone-file"
                title="subir fotos"
                className="flex flex-col items-center justify-center w-[64px] h-[64px] border-2 border-[#FF8960] rounded-lg cursor-pointer "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img src="../+.svg" alt="" />
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  multiple
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-[16px] ml-auto pt-[24px]">
            <button
              className="text-[18px] font-[500] text-[#FFFFFF] bg-[#323232] rounded-[8px] px-[20px] py-[12px] w-[104px]"
              onClick={props.modalClose}
            >
              Cancelar
            </button>
            <button
              className="text-[18px] font-[500] text-[#FFFFFF] bg-[#FF8960] rounded-[8px] px-[20px] py-[12px] w-[104px]"
              type="submit"
            >
              Accepter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create_Advertisment;
