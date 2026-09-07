import {type SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useState} from "react";
import toast from "react-hot-toast";
import {SquareLoader} from "react-spinners";

type Inputs = {
  name: string
  text: string
}

const schema = yup
  .object({
    name: yup.string().required(),
    text: yup.string().required().min(3),
  })
  .required()

const Form = () => {

  const [disableForm, setDisableForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      text: "",
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (disableForm) return;

    setDisableForm(true);

    try {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 3000);
      });

      console.log(data);

      reset({
        name: "",
        text: "",
      });

      toast.success("Успешно отправлено!", {
        removeDelay: 500,
      });
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
    } finally {
      setDisableForm(false);
    }
  };

  // console.log(watch("name"))

  return (
    <div className="bg-white/40 px-5 py-10 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <fieldset disabled={isSubmitting} className="flex flex-col gap-4 w-full min-w-0 border-0 p-0 m-0">
          <div className="pb-6 w-full relative">
            <label>
              <p className="text-xl sm:text-2xl mb-2">Ваше имя:</p>
              <input className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 sm:text-2xl bg-white/50  hover:bg-white/70 w-full focus:bg-white/80 transition-colors duration-300 ease-in-out" autoComplete="off" {...register("name")} />
            </label>
            {errors.name?.message && <span className="absolute left-0 bottom-0 text-red-700">Введите имя</span>}
          </div>
          <div className="pb-6 w-full relative">
            <label>
              <p className="text-xl sm:text-2xl mb-2">Комментарий:</p>
              <textarea className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 sm:text-2xl bg-white/50  hover:bg-white/70 w-full focus:bg-white/80 resize-y min-h-25 w-full transition-colors duration-300 ease-in-out" {...register("text")} />
            </label>
            {errors.text?.message && <span className="absolute left-0 bottom-0 text-red-700">Дополните текст</span>}
          </div>
          <button type="submit"
                  className="flex items-center justify-center px-5 py-3.5 cursor-pointer mt-auto border hover:bg-white/50 hover:border-white/50 transition-colors duration-300 ease-in-out"
          >
            <span className="relative h-8 flex items-center justify-center">
              <span
                style={{
                  opacity: isSubmitting ? 1 : 0,
                }}
                className={`absolute -left-10 flex items-center justify-center shrink-0 transition-opacity duration-300 ease-in-out`}>
                <SquareLoader color="#00435b" size={30}/>
              </span>
              <p className="text-xl leading-none">
                Отправить
              </p>
            </span>
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;