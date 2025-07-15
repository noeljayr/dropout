import "@/css/loader.css";

function Loader({variant}: {variant? : 'primary'}) {
  return <div className={`spinner ${variant}-loader`}></div>;
}

export default Loader;
