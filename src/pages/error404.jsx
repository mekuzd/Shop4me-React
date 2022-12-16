import DefaultLayout from "../Layouts/DefaultLayout";
const Error404 = () => {
  return (
    <>
      <DefaultLayout>
        <main>
          <div className="error">
            <img src={"../90040-error-404.gif"} alt="" />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
};
export default Error404;
