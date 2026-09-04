import Form from "./form.tsx";

const Feedback = () => {
  return (
    <div className="relative h-dvh bg-green-200 flex flex-col justify-center">
      <div className="py-20 max-w-337.5 mx-auto">
        <div className="grid grid-cols-[minmax(400px,.7fr)_minmax(600px,1fr)] gap-16">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-center text-4xl/normal font-bold text-gray-900">
              Создадим ваше идеальное путешествие в&nbsp;<span className="uppercase">Исландию</span>
            </h4>
            <p className="text-center text-xl/normal text-gray-800 max-w-3xl mx-auto mt-4 leading-relaxed">
              Исландия&nbsp;&mdash; это не&nbsp;просто точка на&nbsp;карте, а&nbsp;мир контрастов.
              Мы поможем вам увидеть северное сияние, искупаться в&nbsp;геотермальных источниках
              и&nbsp;пройти по&nbsp;черным пляжам. Заполните форму, чтобы получить уникальный маршрут,
              адаптированный под ваши интересы.
            </p>
          </div>
          <div>
            <Form/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;