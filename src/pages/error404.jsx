import DefaultLayout from "../Layouts/DefaultLayout";
import image from "../assets/90040-error-404.gif";
const Error404 = () => {
  return (
    <>
      <DefaultLayout>
        <main>
          <div className="error">
            <img src={image} alt="" />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
};
export default Error404;
