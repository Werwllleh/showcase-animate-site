import {type Dispatch, type SetStateAction, useEffect} from "react";


const StartLoader = ({active, setLoaderActive, timeout}: {
  active: boolean,
  setLoaderActive: Dispatch<SetStateAction<boolean>>,
  timeout: number
}) => {

  useEffect(() => {
    setTimeout(() => {
      setLoaderActive(false);
    }, timeout)
  }, [])

  return (
    <div className={`fixed top-0 left-0 flex w-full h-full z-50 transition-opacity duration-800 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <div className="shrink relative flex-6/12 w-full h-full">
        <span
          className={`left-0 absolute h-full top-0 bottom-0 bg-pink-500 transition-width delay-300 ease-linear duration-800 ${active ? 'w-full' : 'w-0'}`}/>
      </div>
      <div className="shrink relative flex-6/12 w-full h-full">
        <span
          className={`right-0 absolute h-full top-0 bottom-0 bg-pink-500 transition-width delay-300 ease-linear duration-800 ${active ? 'w-full' : 'w-0'}`}/>
      </div>
      <span className={`absolute z-55 inset-0 m-auto w-[5px] origin-center transition-transform duration-300 bg-white ${active ? 'scale-y-0' : 'scale-y-100'}`} />
    </div>
  );
};

export default StartLoader;