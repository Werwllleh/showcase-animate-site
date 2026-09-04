import {type SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
  example: string
  exampleRequired: string
}

const Form = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example"))

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-5 py-7 h-full bg-white">
        {/* register your input into the hook by invoking the "register" function */}
        <input className="px-5 py-3.5 bg-green-200" defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input className="px-5 py-3.5 bg-green-200" {...register("exampleRequired", {required: true})} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <button type="submit" className="flex items-center justify-center px-5 py-3.5 text-xl cursor-pointer mt-auto border hover:bg-green-200 hover:border-green-200 transition-colors duration-300 ease-in-out">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Form;