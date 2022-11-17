import React, { useEffect, useState } from "react";
const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

export default function ImageUpload(props) {
  const [imageFiles, setImageFiles] = useState([]);
  // const [index,setIndex] = useState()

  // const getBase64 = (file, newBase64) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     resolve(
  //       reader.readAsDataURL(file),
  //       (reader.onload = () => newBase64.push(reader.result))
  //     );
  //   });

  // const handleMultipleImages =  (e) => {
  //   let newBase64 = [];
  //      props.formik.setFieldValue("images",e.target.file);
  //   for (let i = 0; i < e.target.files.length; i++) {
  //      getBase64(e.target.files[i], newBase64);
  //      props.setImages(newBase64);
      
  //   }
  //   console.log("base644444444444444444444", newBase64);
  // };
  // console.log("ddddddddddddddDDDDDDD",props.formik)

  const changeHandler = (e) => {
    props.formik.setFieldValue("images",e.target.value)
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
     setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  useEffect(() => {
    const images = [], fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result)
          }
          if (images.length === imageFiles.length && !isCancel) {
            props.setImages(images);
          }
        }
        fileReader.readAsDataURL(file);
      })
    };

    return () => {
      isCancel = true;
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles]);

const removeimg = (e,i) =>{
  e.preventDefault();
  let imgfiltered = props.images.filter((img,index) => index !== i);
  props.setImages(imgfiltered)
}
  return (
    <>
      <div className="rounded-t mb-0 px-6 py-6">
        <div className="text-center mb-3">
          <h6 className="text-lightBlue-500 text-sm font-bold">Add Images</h6>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300" />
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div className="container px-4 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="mb-3 w-full px-4 flex-6 lg:w-12/12 md:flex-none">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="name"
              >
                Property
                Images&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="file"
                multiple
                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                  props.formik.touched.images && props.formik.errors.images
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                onChange={changeHandler}
                onBlur={props.formik.handleBlur}
                value={props.formik.values.images}
                accept="image/png, image/jpg, image/jpeg"
              />
              {props.formik.touched.images &&props.formik.errors.images && (
                <div
                  style={{ color: "rgb(220 38 38)" }}
                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                >
                  {props.formik.errors.images}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap">
            {props.images.map((val, i) => {
              return (
                <div
                  className="w-full px-4 flex-6 lg:w-6/12 md:flex-none mb-4"
                  key={i}
                >
                  <div className="flex items-start justify-between mt-5 border-b border-solid border-blueGray-200 rounded-t">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={(e) =>removeimg(e,i)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src={val}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container px-4 mx-auto mt-10">
          <div className="flex flex-wrap justify-between sm:justify-center">
            <button
              className="bg-lightBlue-600 text-white active:bg-blueGray-600  text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none  mb-1 w-auto ease-linear transition-all duration-150"
              type="Submit"
              onClick={props.privious}
            >
              Previous
            </button>

            <button
              className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none  mb-1 w-auto ease-linear transition-all duration-150"
              type="Submit"
              onClick={props.handleSubmit}
            >Submit
            </button>
          </div>
        </div>

        <div className="flex justify-between lg:w-12/12 md: w-6/12 flex-none"></div>
      </div>
    </>
  );
}


